import { Injectable } from '@angular/core';

import { getAuth, signInWithPopup,  GoogleAuthProvider, UserCredential } from 'firebase/auth'
import { FirebaseService } from './firebase.service';

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

	async signInWithGoogle() {

		await signInWithPopup(this.auth, this.provider).then((result) => {
			const credential = GoogleAuthProvider.credentialFromResult(result);
			// const token = credential?.accessToken;
			const userCredential = result;
		})
		.catch((error) => {
            console.log(error);
        });

	}

	async signOut() {
		await this.auth.signOut().then().catch(() => {
			console.log("Error signing out")
		});
	}

}
