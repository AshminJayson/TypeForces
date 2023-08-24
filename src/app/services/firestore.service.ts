import { Injectable } from '@angular/core';

import { Firestore, getDocsFromServer, getFirestore } from 'firebase/firestore';
import { FirebaseService } from './firebase.service';
import {
	collection,
	addDoc,
	getDocs,
	query,
	where,
	orderBy,
	limit,
} from 'firebase/firestore';
import { AuthenticationService } from './authentication.service';

@Injectable({
	providedIn: 'root',
})
export class FirestoreService {
	db: Firestore;

	constructor(
		private firebaseService: FirebaseService,
		private authenticationService: AuthenticationService
	) {
		this.db = getFirestore(this.firebaseService.app);
	}

	async addScore(WPM: number, Accuracy: number, timeTaken: number) {
		if (!this.authenticationService.auth.currentUser) return;

		const user = this.authenticationService.auth.currentUser;
		addDoc(collection(this.db, 'Scores'), {
			name: user.displayName,
			useremail: user.email,
			WPM: WPM,
			Accuracy: Accuracy,
			timeTaken: timeTaken,
		});
	}

	async getLeaderboard() {
		const scoresRef = collection(this.db, 'Scores');
		const scoresQuery = query(scoresRef, orderBy('WPM', 'desc'), limit(5));

		const querySnapShot = await getDocs(scoresQuery);

		let leaderboard: any = [];
		querySnapShot.forEach((doc) => {
			leaderboard.push(doc.data());
		});

		// console.log(leaderboard);
		return leaderboard;
	}

	async getUserScores() {
		if (!this.authenticationService.auth.currentUser) return;

		const user = this.authenticationService.auth.currentUser;

		const scoresRef = collection(this.db, 'Scores');
		const scoresQuery = query(
			scoresRef,
			where('useremail', '==', user.email),
			orderBy('WPM', 'desc'),
			limit(5)
		);

		const querySnapShot = await getDocs(scoresQuery);

		let scores: any = [];

		querySnapShot.forEach((doc) => {
			scores.push(doc.data());
		});

		return scores;
	}

	async addStory(storyType: string, storyText: string) {
		return;
		// addDoc(collection(this.db, 'Stories'), {
		// 	storyType: storyType,
		// 	storyText: storyText,
		// });
	}

	async getStory(storyType: string) {
		const storiesRef = collection(this.db, 'Stories');
		const storyQuery = query(
			storiesRef,
			where('storyType', '==', storyType.trim())
		);

		let story = await getDocsFromServer(storyQuery)
			.then((snapshot) => {
				let random = Math.floor(Math.random() * snapshot.size);
				return snapshot.docs[random].data()['storyText'];
			})
			.catch((err) => console.log(err));

		return story;
	}
}
