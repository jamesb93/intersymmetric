import { env } from '$env/dynamic/public';
import { initializeApp } from 'firebase/app';
import { PUBLIC_FB_USERNAME, PUBLIC_FB_PASSWORD } from '$env/static/public';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export const firebaseProdConfig = {
    apiKey: 'AIzaSyBQ-SUfm2OZ_i4UCSK4qGfqZeflaewS004',
    authDomain: 'intersymmetric-7e851.firebaseapp.com',
    databaseURL:
        'https://intersymmetric-7e851-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'intersymmetric-7e851',
    storageBucket: 'intersymmetric-7e851.appspot.com',
    messagingSenderId: '500933689703',
    appId: '1:500933689703:web:dd664fc065f7b9cce22fc2',
    measurementId: 'G-Q9HCJJXHGM'
};

export const firebaseDevConfig = {
    apiKey: 'AIzaSyCjOuL3px3S0ptXWgKyvH91tv2bnHM8ZBA',
    authDomain: 'intersymmetric-staging.firebaseapp.com',
    databaseURL:
        'https://intersymmetric-staging-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'intersymmetric-staging',
    storageBucket: 'intersymmetric-staging.appspot.com',
    messagingSenderId: '766905406427',
    appId: '1:766905406427:web:28e94f14e502e907e68dfe',
    measurementId: 'G-W1KJ630H0K'
};

/**
 * Determines the Firebase configuration based on the environment's public mode.
 * If the public mode is 'dev' or undefined, the development configuration is used.
 * Otherwise, the production configuration is used.
 *
 * @returns {Object} The Firebase configuration object.
 */
export const firebaseConfig =
    env.PUBLIC_MODE === 'dev' || env.PUBLIC_MODE === undefined
        ? firebaseDevConfig
        : firebaseProdConfig;

export const app = initializeApp(firebaseConfig);

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
