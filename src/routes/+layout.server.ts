import * as secret from '$env/static/private';
import { initializeApp } from 'firebase-admin';
import * as admin from 'firebase-admin';
import { getApps } from 'firebase-admin/app';

const config = {
	projectId: secret.FS_ADMIN_SDK_PROJECT_ID,
	privateKey: secret.FS_ADMIN_SDK_PRIVATE_KEY?.replace(/\\n/gm, '\n') || '',
	clientEmail: secret.FS_ADMIN_SDK_CLIENT_EMAIL
};

const apps = getApps();

if (!apps.length) {
	initializeApp({
		credential: admin.credential.cert(config)
	});
}

admin.firestore().collection('test').doc('test').set({ test: new Date().toString() });
