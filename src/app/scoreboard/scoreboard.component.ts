import { Component } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { TriggerService } from '../services/trigger.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-scoreboard',
	templateUrl: './scoreboard.component.html',
	styleUrls: ['./scoreboard.component.scss'],
})
export class ScoreboardComponent {
	userScores : any = [];
	globalScores : any =  []
	loggedIn : boolean = false;

	constructor(private firestoreService : FirestoreService, private triggerService : TriggerService, private router : Router, private activatedRoute : ActivatedRoute) {

		this.triggerService.message$.subscribe((message : string) => {
			this.scoreSetter();
		})

		// One second timeout to compensate for the relogin during page reloads
		setTimeout(() => {
			this.scoreSetter();
		}, 1000);
		
	}
	
	
	scoreSetter() {

		this.loggedIn = false;
		if (localStorage.getItem('userCredential')) this.loggedIn = true;
		
		this.firestoreService.getLeaderboard().then(
			leaderboard => {
                this.globalScores = leaderboard;
            }
		)

		this.firestoreService.getUserScores().then(
			userScores => {
                this.userScores = userScores;
            }
		)
	}




}
