import { AfterViewInit, Component, ElementRef, HostListener,  QueryList, Renderer2, ViewChildren, ViewContainerRef } from '@angular/core';
import { StopwatchService } from './services/stopwatch.service';

@Component({
    selector: 'app-typeforce',
    templateUrl: './typeforce.component.html',
    styleUrls: ['./typeforce.component.scss'],
})
export class TypeforceComponent implements AfterViewInit {
    textgen : string = 'random text what i just got from somewhere'
    // to be tested in this setting lemme make this a lot longer so that I can appreciate the changes that are here.';

    wordgenarray : string[] = [];
    charactergenarray : string[] = [];
    currentarrayindex : number = 0;


    constructor(private renderer : Renderer2, private stopwatch : StopwatchService) {
        this.wordgenarray = this.textgen.split(/(?<=\s)/);
        this.charactergenarray = this.textgen.split('');
    }

    // Modifier to update DOM state of character spans
    @ViewChildren('charactersonscreen', { read: ElementRef }) charactersonscreen !: QueryList<ElementRef>;

    // Listener that checks for keypress events
    @HostListener('document:keydown', ['$event'])
    trackKeyPress(event: KeyboardEvent) {    
        this.checkKeyPress(event.key)
    }


    checkKeyPress(keypressed: string) {
        console.log('key pressed: ' + keypressed)

        // Logic to determine correct key press

        if (keypressed === this.charactergenarray[this.currentarrayindex]) this.setCorrectCharacter()
        else if (keypressed === 'Backspace') this.rewindActiveCharacter()
        else this.setIncorrectCharacter()
        
    }

    // Activate the next character
    setActiveCharacter() {

        if (this.currentarrayindex === this.textgen.length) this.reportScore()

        this.currentarrayindex = Math.max(this.currentarrayindex, 0)
        
        const characterunderstudy = this.charactersonscreen.get(this.currentarrayindex)
        this.renderer.setAttribute(characterunderstudy?.nativeElement, 'class', 'active')
        
    }
    
    // Handle backspace
    rewindActiveCharacter() {
        const characterunderstudy = this.charactersonscreen.get(this.currentarrayindex)
        this.renderer.setAttribute(characterunderstudy?.nativeElement, 'class', '')
        this.currentarrayindex--;

        this.setActiveCharacter()
    }

    // Validate the current character
    setCorrectCharacter() {
        const characterunderstudy = this.charactersonscreen.get(this.currentarrayindex)
        this.renderer.setAttribute(characterunderstudy?.nativeElement, 'class', 'correct')
        this.currentarrayindex++;

        this.setActiveCharacter()
    }

    // Invalidate the current character
    setIncorrectCharacter() {

        const characterunderstudy = this.charactersonscreen.get(this.currentarrayindex)
        this.renderer.setAttribute(characterunderstudy?.nativeElement, 'class', 'incorrect')
        this.currentarrayindex++;

        this.setActiveCharacter()

    }

    // Report the score
    reportScore() {
        alert('You scored'+ this.currentarrayindex +'out of'+ this.textgen.length)
    }


    ngAfterViewInit(): void {
        this.renderer.setAttribute(this.charactersonscreen.get(0)?.nativeElement, 'class', 'active')
    }

}
