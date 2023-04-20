import { Component } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';

@Component({
	selector: 'app-scoreboard',
	templateUrl: './scoreboard.component.html',
	styleUrls: ['./scoreboard.component.scss'],
})
export class ScoreboardComponent {
	userScores : any = [];
	globalScores : any =  []
	loggedIn : boolean = false;

	constructor(private firestoreService : FirestoreService) {

		// One second timeout to compensate for the relogin during page reloads
		if (localStorage.getItem('userCredential')) this.loggedIn = true;
		setTimeout(() => {
			this.scoreSetter();
		}, 1000);

	}
	
	

	scoreSetter() {
		this.firestoreService.getLeaderboard().then(
			leaderboard => {
                this.globalScores = leaderboard;
            }
		)

		this.firestoreService.getUserScores().then(
			userScores => {
                this.userScores = userScores;
				console.log(this.userScores);
            }
		)
	}




}
