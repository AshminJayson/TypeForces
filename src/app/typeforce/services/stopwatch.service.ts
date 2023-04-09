import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class StopwatchService {
    starttime !: number;

    constructor() {}

    start() {
        this.starttime = Date.now()
        // console.log(this.elapsedtime)
    }

    getTimeMilliSeconds() { 
        return Date.now() - this.starttime;
    }

    getTimeSeconds(): number {
        return (Date.now() - this.starttime) / 1000;
    }

    getTimeMinutes() : number {
        return (Date.now() - this.starttime) / (1000 * 60);
    }

    stop() {
        this.starttime = 0
    }
}
