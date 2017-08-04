import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { HttpModule, RequestOptions, XHRBackend } from "@angular/http";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { CollapseModule } from "ngx-bootstrap";
import { DatePickerModule } from "ng2-datepicker";
import { AngularFireModule } from "angularfire2";
import { environment } from "../environments/environment";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";

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
import { PlayerService } from "./services/player/player.service";
import { AuthService } from "./auth/auth.service";
import { UserService } from "./services/user/user.service";
import { HttpService } from "./services/http/http.service";
import { LeagueService } from "./services/league/league.service";
import { ProfileComponent } from "./profile/profile.component";
import { LeagueComponent } from "./league/league.component";

export function _useFactory(backend: XHRBackend, options: RequestOptions) {
  return new HttpService(backend, options);
}

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
    path: "league",
    component: LeagueComponent
  },
  {
    path: "profile",
    component: ProfileComponent
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
    GameStatsComponent,
    ProfileComponent,
    LeagueComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CollapseModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    NgxDatatableModule,
    DatePickerModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
    PlayerService,
    GameService,
    AuthService,
    LeagueService,
    UserService,
    {
      provide: HttpService,
      useFactory: _useFactory,
      deps: [XHRBackend, RequestOptions]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
