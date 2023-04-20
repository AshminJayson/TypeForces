import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { TypeforceComponent } from './typeforce/typeforce.component';

const routes: Routes = [
	{ path: '', component: TypeforceComponent },
	{ path: 'scores', component: ScoreboardComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
