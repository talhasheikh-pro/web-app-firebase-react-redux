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

async function grantAdminRole(uid) {
    return await admin
        .auth()
        .setCustomUserClaims(uid, { admin: true })
        .then(() => {
            return 'admin access granted successfully';
        });
}
