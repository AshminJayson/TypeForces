import { AfterViewChecked,  Component, ElementRef, EventEmitter, HostListener,  Input,  Output,  QueryList, Renderer2, ViewChildren  } from '@angular/core';
import { StopwatchService } from './services/stopwatch.service';
import { StorygptService } from './services/storygpt.service';

@Component({
    selector: 'app-typeforce',
    templateUrl: './typeforce.component.html',
    styleUrls: ['./typeforce.component.scss'],
})
export class TypeforceComponent implements AfterViewChecked  {

    // Text variables
    textgen : string = 'random text that I just got from somewhere to the changes that are here.'
    
    wordgenarray : string[] = [];
    charactergenarray : string[] = [];
    currentarrayindex : number = 0;
    valid : string[] = [];

    // States
    viewcheckedstate : boolean = false;
    remainingtime : number = 2;
    nextstory : boolean = false;

    // Typing state
    status : number = 0;
    

    // Typing scores
    correctcharacters : number = 0;
    wpm : number = 0;
    accuracy: number = 0;
    elapsedtime : number = 0;


    
    @Input() maxwords : number = 0;
    @Output() resetEvent = new EventEmitter<boolean>();


    
    constructor(private renderer : Renderer2, private stopwatch : StopwatchService, private storyGenerator : StorygptService) {}

    ngOnInit() { 
        this.setNewStory()
    }

    setNewStory() {

        this.nextStoryTimer()
        
        this.storyGenerator.generateStory(this.maxwords).then(res => {
            
            this.status = 0;
            this.correctcharacters = 0;
            this.wpm = 0;  
            this.accuracy = 0;
            this.textgen = res.trim();
            this.currentarrayindex = 0;
            this.wordgenarray = this.textgen.split(/(?<=\s)/);
            this.charactergenarray = this.textgen.split('');
            this.valid = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.,?/><;:][]{}()!@#$%^&*1234567890-_=+ '.split('')
            this.valid.push('Backspace', "'", '"')
        }
        )
    }



    // Modifier to update DOM state of character spans
    @ViewChildren('charactersonscreen', { read: ElementRef }) charactersonscreen !: QueryList<ElementRef>;

    // Listener that checks for keypress events
    @HostListener('document:keydown', ['$event'])
    trackKeyPress(event: KeyboardEvent) {



        if (event.key === 'Control') this.setNewStory()


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
        this.renderer.setAttribute(characterunderstudy?.nativeElement, 'wasWrong', 'true')

        this.currentarrayindex++;
        this.setActiveCharacter()

    }

    // Report the score
    reportScore() {
        this.status = 2
        this.wpm = Math.round(this.correctcharacters  / (5 * this.stopwatch.getTimeMinutes()))
        this.accuracy = Math.round((this.correctcharacters / this.textgen.length) * 100)

        this.nextStoryTimer()

        setTimeout(() => {
            this.setNewStory()
        }, 5000);
    }

    nextStoryTimer() {
        this.nextstory = true;
        const timing = setInterval(() => {
            if (this.remainingtime === 0) {
                clearInterval(timing);
                this.remainingtime = 6;
                this.nextstory = false;
            }
            this.remainingtime--;
        }, 1000)
    }
    

    resetTest() {
        this.resetEvent.emit(true)
    }


// Set first active character
    ngAfterViewChecked(): void {
        if(this.charactersonscreen.get(0) && !this.viewcheckedstate) { 
            this.renderer.setAttribute(this.charactersonscreen.get(0)?.nativeElement, 'class', 'active')
            this.viewcheckedstate = true       
        }   
    }


}
