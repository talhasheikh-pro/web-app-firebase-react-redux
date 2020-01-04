/**
 * @usage - function(s) which interacts with the API, sending HTTP requests goes here
 */

import { firebaseAuth } from '../client/firebase';
import { EMAIL_VERIFICATION_REDIRECTION_URL } from '../auth/constants';

/**
 * @usage - to register new user using firebase SDK
 *
 * @param {string} email - user's email to regiter with
 * @param {string} password - user's password associated with the account
 */
export function registerUser({ email, password }) {
    return firebaseAuth.createUserWithEmailAndPassword(email, password);
}

/**
 * @usage - to sign user in using firebase SDK
 *
 * @param {string} email - user's email to login with
 * @param {string} password - user's password associated with the account
 */
export function loginUser({ email, password }) {
    return firebaseAuth.signInWithEmailAndPassword(email, password);
}

/**
 * @usage User's email verification process via Firebase SDK
 */
export function sendEmailVerification() {
    firebaseAuth.onAuthStateChanged(function(user) {
        if (user) {
            if (!user.emailVerified) {
                user.sendEmailVerification({
                    url: EMAIL_VERIFICATION_REDIRECTION_URL,
                });
            }
        }
    });
}
