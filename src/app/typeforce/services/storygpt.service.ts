import { Injectable } from '@angular/core';
import { Configuration, OpenAIApi } from 'openai';

import { gptenvironment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root',
})
export class StorygptService {
    gptapiKey : string = '' 
    generatedstory : string = 'This is the backup story'
    configuration !: Configuration;
    openai !: OpenAIApi;

    constructor() {
        this.gptapiKey = gptenvironment.CHATGPT_API_URL;
        const configuration = new Configuration({
            apiKey: this.gptapiKey,
        });
        this.openai = new OpenAIApi(configuration)
        // console.log(this.openai)
    }

    async generateStory(maxwords : number, storytype : string) { 
        const response = await this.openai.createCompletion({
            model: 'text-davinci-003',
            prompt: `write me a ${maxwords} word story about ${storytype}`,
            max_tokens: 500,
        })

        this.generatedstory = response.data.choices[0].text!
        // console.log(this.generatedstory)

        return this.generatedstory

    }

}
