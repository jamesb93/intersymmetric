import { env } from '$env/dynamic/public';
import { initializeApp } from 'firebase/app';
import { PUBLIC_FB_USERNAME, PUBLIC_FB_PASSWORD } from '$env/static/public';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseDevConfig, firebaseProdConfig } from './firebase-config';

/**
 * Determines the Firebase configuration based on the environment's public mode.
 * If the public mode is 'dev' or undefined, the development configuration is used.
 * Otherwise, the production configuration is used.
 *
 * @returns {Object} The Firebase configuration object.
 */
const activeFirebaseConfig =
    env.PUBLIC_MODE === 'dev' || env.PUBLIC_MODE === undefined
        ? firebaseDevConfig
        : firebaseProdConfig;

export const app = initializeApp(activeFirebaseConfig);

/**
 * Authenticates the user by signing in with the provided username and password.
 * @returns {Promise<void>} A promise that resolves when the authentication is successful.
 */
export async function authenticate() {
    const auth = getAuth(app);
    await signInWithEmailAndPassword(auth, PUBLIC_FB_USERNAME, PUBLIC_FB_PASSWORD)
        .then(() => {
            return;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
}
