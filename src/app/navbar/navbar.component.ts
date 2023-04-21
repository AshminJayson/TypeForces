import { AfterViewChecked, Component, DoCheck, OnChanges, SimpleChanges } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TriggerService } from '../services/trigger.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnChanges {
    navheading: string = 'TYPE FORCES';

    loggedIn !: boolean;

    constructor(private authenticationService: AuthenticationService, private router: Router, private activatedRoute : ActivatedRoute, private triggerService : TriggerService) {}

    ngOnInit() {
        this.authenticationService.tryRelogin().then(() => {
            this.setLoginStatus();
        }) ;
    }

    signIn() {
        this.authenticationService.signInWithGoogle().then(() => {
            this.setLoginStatus();
        });

    }
    
    signOut() {
        this.authenticationService.signOut().then(() => {
            this.setLoginStatus();
        });

    }

    setLoginStatus() {
        this.loggedIn = this.authenticationService.auth.currentUser;
        this.triggerService.sendMessage('reload');
    }

    navigateHome() {
        this.router.navigate(['/']);
    }
    redirectToScores() {
        this.router.navigate(['/scores']);
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log('Change')
    }

}
