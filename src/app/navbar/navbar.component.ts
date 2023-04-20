import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
    navheading: string = 'TYPE FORCES';

    loggedIn !: boolean;

    constructor(private authenticationService: AuthenticationService, private router: Router, private activatedRoute : ActivatedRoute) {}

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
    }

    navigateHome() {
        this.router.navigate(['/']);
    }
    redirectToScores() {
        this.router.navigate(['/scores']);
    }
}
