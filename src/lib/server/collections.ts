import type admin from 'firebase-admin';

export const getBaseConverter = <
	T extends admin.firestore.DocumentData
>(): admin.firestore.FirestoreDataConverter<T> => ({
	toFirestore: (item: T) => item,
	fromFirestore: (snapshot: admin.firestore.QueryDocumentSnapshot<T>) => {
		const data = snapshot.data();
		return {
			...data
		};
	}
});
