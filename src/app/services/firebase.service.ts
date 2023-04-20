import { Injectable } from '@angular/core';

import { FirebaseApp, initializeApp } from 'firebase/app';


import { firebaseenvironment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class FirebaseService {

	app : FirebaseApp

	firebaseConfig = {
		apiKey: firebaseenvironment.FIREBASE_API_KEY,
		authDomain: firebaseenvironment.FIREBASE_AUTH_DOMAIN,
		projectId: firebaseenvironment.FIREBASE_PROJECT_ID,
		storageBucket: firebaseenvironment.FIREBASE_STORAGE_BUCKET,
		messagingSenderId: firebaseenvironment.FIREBASE_MESSAGING_SENDER_ID,
		appId: firebaseenvironment.FIREBASE_APP_ID,
	};

	constructor() {
		console.log('Constructing firebase appp');
		this.app = initializeApp(this.firebaseConfig);
	}
}
