import * as secret from '$env/static/private';
import admin from 'firebase-admin';
import { getApps } from 'firebase-admin/app';

const config = {
	projectId: secret.FS_ADMIN_SDK_PROJECT_ID,
	privateKey: secret.FS_ADMIN_SDK_PRIVATE_KEY?.replace(/\\n/gm, '\n') || '',
	clientEmail: secret.FS_ADMIN_SDK_CLIENT_EMAIL
};

export const getAdminApp = () => {
	const apps = getApps();

	if (!apps.length) {
		admin.initializeApp({
			credential: admin.credential.cert(config)
		});
	}
	return admin;
};

export const getFirestoreAdmin = (): admin.firestore.Firestore => getAdminApp().firestore();
