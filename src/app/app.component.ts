import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'TypeForces';
    resetState : boolean = true;


    resetChild(event: boolean) {
        this.resetState = !this.resetState;
        setTimeout(() => {
            this.resetState = !this.resetState;
        }, 1);
    }
}
