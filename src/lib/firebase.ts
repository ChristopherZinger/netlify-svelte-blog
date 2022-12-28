import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectStorageEmulator, getStorage } from 'firebase/storage';

export enum TIER {
	prod = 'PROD',
	staging = 'STAGING'
}

export const getFirebaseConf = (tier: TIER) => {
	const config: Record<TIER, any> = {
		[TIER.staging]: {
			apiKey: 'AIzaSyAvTQsNXossHsr-P0v3CXITrqWnHLN8pVU',
			authDomain: 'blog-svelte.firebaseapp.com',
			projectId: 'blog-svelte',
			storageBucket: 'blog-svelte.appspot.com',
			messagingSenderId: '313278722087',
			appId: '1:313278722087:web:b00f6ebae0f8ee00391e02',
			measurementId: 'G-CZD6P4NP58'
		},
		[TIER.prod]: {
			apiKey: 'AIzaSyBe-2Vx2uLU0I6hmUeR9Zu-sOTcq7TfcFE',
			authDomain: 'prod-blog-svelte.firebaseapp.com',
			projectId: 'prod-blog-svelte',
			storageBucket: 'prod-blog-svelte.appspot.com',
			messagingSenderId: '420952332160',
			appId: '1:420952332160:web:b9b4046f1cf5150e009365',
			measurementId: 'G-2PLZWS9NHY'
		}
	};
	return config[tier];
};

export const connectEmulators = () => {
	connectFirestoreEmulator(getFirestore(), 'localhost', 8080);
	connectAuthEmulator(getAuth(), 'http://localhost:9099');
	connectStorageEmulator(getStorage(), 'localhost', 9199);
};
