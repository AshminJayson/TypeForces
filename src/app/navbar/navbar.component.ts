import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
    navheading: string = 'TYPE FORCES';

    loggedIn: boolean = false;

    constructor(private authenticationService: AuthenticationService) {}

    googleAuth() {
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
}
