import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { HttpModule } from "@angular/http";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { CollapseModule } from "ngx-bootstrap";
import { DatePickerModule } from "ng2-datepicker";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { NavComponent } from "./nav/nav.component";
import { LoginComponent } from "./login/login.component";
import { LoginFormComponent } from "./login-form/login-form.component";
import { PlayersComponent } from "./players/players.component";
import { PlayerStatsComponent } from "./player-stats/player-stats.component";
import { ScheduleComponent } from "./schedule/schedule.component";
import { ScoreboardComponent } from "./scoreboard/scoreboard.component";
import { BoxScoreComponent } from "./box-score/box-score.component";
import { GameStatsComponent } from "./game-stats/game-stats.component";
import { GameService } from "./services/game/game.service";

const appRoutes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "about",
    component: AboutComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "signup",
    component: LoginComponent
  },
  {
    path: "player",
    component: PlayersComponent
  },
  {
    path: "schedule",
    component: ScheduleComponent
  },
  {
    path: "boxscore/:season/:date/:teams",
    component: BoxScoreComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,
    LoginFormComponent,
    PlayersComponent,
    PlayerStatsComponent,
    ScheduleComponent,
    ScoreboardComponent,
    BoxScoreComponent,
    GameStatsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CollapseModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    NgxDatatableModule,
    DatePickerModule
  ],
  providers: [ScoreService, GameService],
  bootstrap: [AppComponent]
})
export class AppModule {}
