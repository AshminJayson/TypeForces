import { AfterViewInit, Component, ElementRef, HostListener,  QueryList, Renderer2, ViewChildren, ViewContainerRef } from '@angular/core';
import { StopwatchService } from './services/stopwatch.service';

@Component({
    selector: 'app-typeforce',
    templateUrl: './typeforce.component.html',
    styleUrls: ['./typeforce.component.scss'],
})
export class TypeforceComponent implements AfterViewInit {

    // Text variables
    textgen : string = 'random text that I just got from somewhere to be tested in this setting lemme make this a lot longer so that I can appreciate the changes that are here.'
    
    wordgenarray : string[] = [];
    charactergenarray : string[] = [];
    currentarrayindex : number = 0;
    valid : string[] = [];
    

    // Typing state
    status : number = 0;
    
    // Typing scores
    correctcharacters : number = 0;
    wpm : number = 0;
    accuracy: number = 0;
    elapsedtime : number = 0;


    
    
    constructor(private renderer : Renderer2, private stopwatch : StopwatchService) {
        this.wordgenarray = this.textgen.split(/(?<=\s)/);
        this.charactergenarray = this.textgen.split('');
        this.valid = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.,rand '.split('')
        this.valid.push('Backspace')
    }

    // Modifier to update DOM state of character spans
    @ViewChildren('charactersonscreen', { read: ElementRef }) charactersonscreen !: QueryList<ElementRef>;

    // Listener that checks for keypress events
    @HostListener('document:keydown', ['$event'])
    trackKeyPress(event: KeyboardEvent) {
        if (!this.valid.includes(event.key)) return

        if (this.status === 0) {
            this.stopwatch.start()

            const timing = setInterval(() => {
                this.elapsedtime = this.stopwatch.getTimeSeconds();

                if (this.status === 2) {
                    clearInterval(timing);
                    this.stopwatch.stop()
                }
            }, 100)

            this.status = 1 
        }
        
        this.checkKeyPress(event.key)
    }


    // Logic to determine correct key press
    checkKeyPress(keypressed: string) {



        if (keypressed === 'Control') {

        }


        
        if (keypressed === this.charactergenarray[this.currentarrayindex]) this.setCorrectCharacter()
        else if (keypressed === 'Backspace') this.rewindActiveCharacter()
        else if(this.currentarrayindex < this.textgen.length) this.setIncorrectCharacter()

    }

    // Activate the next character
    setActiveCharacter() {

        if (this.currentarrayindex === this.textgen.length){ this.reportScore(); return}

        this.currentarrayindex = Math.max(this.currentarrayindex, 0)
        
        const characterunderstudy = this.charactersonscreen.get(this.currentarrayindex)
        this.renderer.setAttribute(characterunderstudy?.nativeElement, 'class', 'active')
        
    }
    
    // Handle backspace
    rewindActiveCharacter() {
        let characterunderstudy = this.charactersonscreen.get(this.currentarrayindex)
        this.renderer.setAttribute(characterunderstudy?.nativeElement, 'class', '')
        this.currentarrayindex--;

        characterunderstudy = this.charactersonscreen.get(this.currentarrayindex);
        if (characterunderstudy?.nativeElement.getAttribute('class') === 'correct') this.correctcharacters--;

        this.setActiveCharacter()
    }

    // Validate the current character
    setCorrectCharacter() {
        const characterunderstudy = this.charactersonscreen.get(this.currentarrayindex)
        this.renderer.setAttribute(characterunderstudy?.nativeElement, 'class', 'correct')
        this.currentarrayindex++;

        this.correctcharacters++;

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
        this.status = 2
        this.wpm = Math.round(this.correctcharacters  / (5 * this.stopwatch.getTimeMinutes()))
        this.accuracy = Math.round((this.correctcharacters / this.textgen.length) * 100)
    }


    ngAfterViewInit(): void {
        this.renderer.setAttribute(this.charactersonscreen.get(0)?.nativeElement, 'class', 'active')
    }


}
