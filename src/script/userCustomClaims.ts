//npx ts-node --esm src/script/userCustomClaims.ts

/*
  - get user uid from firebase console > authentication > users

  - remember to first:
  > export GOOGLE_APPLICATION_CREDENTIALS=[...path/firebase-admin-service-account-key.json]
*/

import { initializeApp } from 'firebase-admin/app';
import admin from 'firebase-admin';
import { AppError } from '$lib/utils/AppError';

const UID: string | null = null;

async function main() {
	initializeApp();

	if (!UID) {
		throw new AppError('missing_user_uid');
	}

	admin.auth().setCustomUserClaims(UID, { isBlogAdmin: true });

	console.log('DONE');
}

void main();
