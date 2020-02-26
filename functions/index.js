const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: functions.config().mailer.email,
        pass: functions.config().mailer.pwd,
    },
});

exports.AddAdminRole = functions.https.onCall((data, context) => {
    if (context.auth.token.admin !== true) {
        return {
            error: 'Unauthorize action, you need to have proper permissions',
        };
    }

    return grantAdminRole(data.uid);
});

exports.listUsers = functions.https.onCall((data, context) => {
    if (context.auth.token.admin !== true) {
        return {
            error: 'Unauthorize action, you need to have proper permissions',
        };
    }

    return listAllUsers();
});

// Listen for changes in all documents in the 'users' collection
exports.notifyUserOnSuccessfulReservation = functions.firestore
    .document('Reservations/{reservationId}')
    .onCreate((snap, context) => {
        const reservation = snap.data();

        console.log(reservation);

        return admin
            .auth()
            .getUser(reservation.user_id.id)
            .then((userRecord) => {
                let startTime = new Date(null);
                startTime = new Date(
                    startTime.setTime(reservation.start_time.seconds * 1000),
                ).toString();
                let endTime = new Date(null);
                endTime = new Date(
                    endTime.setTime(reservation.end_time.seconds * 1000),
                ).toString();

                // See the UserRecord reference doc for the contents of userRecord.
                const mailOptions = {
                    from: `Parking App Notifier <talhasheikh.pro@gmail.com>`, // Something like: Jane Doe <janedoe@gmail.com>
                    to: userRecord.email,
                    subject: 'Parking Slot Reserved', // email subject
                    html: `<p style="font-size: 16px;">Reservation Details</p>
                        <br />
                        <h4>ID: ${snap.id}</h4>
                        <h4>Start Date/Time: ${startTime}</h4>
                        <h4>End Date/Time: ${endTime}</h4>
                    `,
                };

                // returning result
                return transporter.sendMail(mailOptions, (erro, info) => {
                    if (erro) {
                        console.log(erro);
                        return erro.toString();
                    }

                    console.log(info);
                    return info;
                });
            })
            .catch((error) => {
                console.log('Error fetching user data:', error);
            });
    });

async function listAllUsers(nextPageToken) {
    // List batch of users, 1000 at a time.
    try {
        const users = await admin.auth().listUsers(1000, nextPageToken);
        const usersInJSON = users.users.map((userRecord) => {
            return userRecord.toJSON();
        });

        return usersInJSON;
    } catch (e) {
        return e;
    }
}

async function grantAdminRole(uid) {
    return await admin
        .auth()
        .setCustomUserClaims(uid, { admin: true })
        .then(() => {
            return 'admin access granted successfully';
        });
}
