import { Injectable } from '@angular/core';

import { getAuth, signInWithPopup,  GoogleAuthProvider, UserCredential, setPersistence, browserLocalPersistence, signInWithCredential, browserSessionPersistence } from 'firebase/auth'
import { FirebaseService } from './firebase.service';
import { useAnimation } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

	provider : GoogleAuthProvider; 
	auth : any;

  	constructor(firebaseService : FirebaseService) {
    	this.provider = new GoogleAuthProvider();
		this.auth = getAuth();

	}

	async tryRelogin() {
		
		const storedCredentialString = localStorage.getItem('userCredential');

		if (storedCredentialString) {
			const storedCredential = JSON.parse(storedCredentialString);
			const credential = GoogleAuthProvider.credentialFromResult(storedCredential);

			if(credential) {
				await signInWithCredential(this.auth, credential);
			}
		}
	}

	async signInWithGoogle() {

			
		await signInWithPopup(this.auth, this.provider).then((result) => {
			const credential = GoogleAuthProvider.credentialFromResult(result);
			// const token = credential?.accessToken;
			const userCredential = result;
			localStorage.setItem('userCredential', JSON.stringify(userCredential));

			})
		.catch((error) => {
			console.log(error);
		});


	}

	async signOut() {
		await this.auth.signOut().then(() => {
			localStorage.clear();
		}).catch(() => {
			console.log("Error signing out")
		});
	}

}
