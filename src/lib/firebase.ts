import { initializeApp } from 'firebase/app';

const firebaseConfig = {
	apiKey: 'AIzaSyAvTQsNXossHsr-P0v3CXITrqWnHLN8pVU',
	authDomain: 'blog-svelte.firebaseapp.com',
	projectId: 'blog-svelte',
	storageBucket: 'blog-svelte.appspot.com',
	messagingSenderId: '313278722087',
	appId: '1:313278722087:web:b00f6ebae0f8ee00391e02',
	measurementId: 'G-CZD6P4NP58'
};

const app = initializeApp(firebaseConfig);
