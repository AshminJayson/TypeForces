import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class StopwatchService {
    elapsedtime !: number;

    constructor() {}

    start() {
        this.elapsedtime = Date.now()
        console.log(this.elapsedtime)
    }

    getTime(): number {
        return this.elapsedtime;
    }
}
