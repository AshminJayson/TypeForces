import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TypeforceComponent } from './typeforce/typeforce.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		TypeforceComponent,
		ScoreboardComponent,
	],
	imports: [BrowserModule, AppRoutingModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
