const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

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
