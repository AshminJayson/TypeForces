import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TriggerService {

  message$ = new Subject<string>();


  sendMessage(message: string) {
    this.message$.next(message);
  }
  
  constructor() { }
}
