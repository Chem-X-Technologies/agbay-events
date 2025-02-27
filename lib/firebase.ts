import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { Platform } from 'react-native';

const isIos = Platform.OS === "ios";

function validateConfig(config: Record<string, string | undefined>, platform: string) {
  const requiredFields = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];

  for (const field of requiredFields) {
    if (!config[field]) {
      throw new Error(`Missing Firebase ${platform} config: ${field}`);
    }
  }
}

const androidConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_ANDROID_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_ANDROID_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_ANDROID_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_ANDROID_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_ANDROID_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_ANDROID_APP_ID
}

const iosConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_IOS_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_IOS_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_IOS_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_IOS_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_IOS_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_IOS_APP_ID
}

const firebaseConfig = isIos ? iosConfig : androidConfig;
validateConfig(firebaseConfig, isIos ? 'iOS' : 'Android');

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);