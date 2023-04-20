import { Injectable } from '@angular/core';

import { Firestore, getFirestore } from 'firebase/firestore';
import { FirebaseService } from './firebase.service';
import { collection, addDoc, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { AuthenticationService } from './authentication.service';

@Injectable({
	providedIn: 'root',
})
export class FirestoreService {


	db : Firestore	

	constructor(private firebaseService: FirebaseService, private authenticationService: AuthenticationService) {
		this.db = getFirestore(this.firebaseService.app)
	}

	async addScore(WPM : number, Accuracy : number, timeTaken : number) {

		if (!this.authenticationService.auth.currentUser) return 
		
		const user = this.authenticationService.auth.currentUser
		addDoc(collection(this.db, "Scores"), {
			name: user.displayName,
			useremail : user.email,
			WPM : WPM,
            Accuracy : Accuracy,
            timeTaken : timeTaken
		})
		
	}
	
	async getLeaderboard() {
		const scoresRef = collection(this.db, "Scores");
		const scoresQuery = query(scoresRef, orderBy("WPM", "desc"), limit(10));
		
		const querySnapShot = await getDocs(scoresQuery);
		
		let leaderboard :any = [];
		querySnapShot.forEach((doc) => {
			leaderboard.push(doc.data())
		})
		
		// console.log(leaderboard);
		return leaderboard;
	}
	
	async getUserScores() {
		
		if (!this.authenticationService.auth.currentUser) return 
		const user = this.authenticationService.auth.currentUser
		
		const scoresRef = collection(this.db, "Scores");
		const scoresQuery = query(scoresRef, where("useremail", "==", user.email) ,orderBy("WPM", "desc"), limit(10));
		
		const querySnapShot = await getDocs(scoresQuery);
		
		let scores :any = [];
		
		querySnapShot.forEach(doc => {
			scores.push(doc.data())
		})
		
		// console.log(scores)
		
		return scores;
	}
	
	async addStory(storyType: string, storyText: string) {
		addDoc(collection(this.db, "Stories"), {
			storyType: storyType,
            storyText: storyText
		})
	}
	
	async getStory(storyType : string) {

		const storiesRef = collection(this.db, "Stories");
		const storyQuery = query(storiesRef, where("storyType", "==", storyType));
		
		const querySnapShot = await getDocs(storyQuery);
		
		let random = Math.floor(Math.random() * (querySnapShot.size));
		let story = querySnapShot.docs[random].data()['storyText'];
		
		return story;
	}
}