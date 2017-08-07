import { CreateLeagueDialogComponent } from './../create-league-dialog/create-league-dialog.component';
import { Component, OnInit } from '@angular/core';
import { LeagueService } from '../services/league/league.service';
import { MdDialog, MdDialogRef } from '@angular/material';
import { AuthService } from '../services/auth/auth.service';
import {
  NotificationsService,
  SimpleNotificationsComponent
} from 'angular2-notifications';

interface League {
  name: string;
  id: number;
  numOfPlayers: number;
  capacity: number;
}

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.scss']
})
export class LeagueComponent implements OnInit {
  public leagues: Array<League>;
  public userLeagues: Array<League>;
  public options = {
    position: ['top', 'left'],
    timeOut: 500,
    lastOnBottom: true
  };
  constructor(
    private leagueService: LeagueService,
    public dialog: MdDialog,
    private authService: AuthService,
    private _notificationsService: NotificationsService
  ) {}

  ngOnInit() {
    this.getLeagues();
  }

  private getLeagues() {
    let userId = this.authService.getUserId();
    this.leagueService.getLeagues(userId).subscribe(leagues => {
      this.userLeagues = leagues;
    });
    this.leagueService.getLeagues().subscribe(leagues => {
      this.leagues = leagues;
    });
  }
  openCreateLeagueDialog() {
    let dialogRef = this.dialog.open(CreateLeagueDialogComponent, {
      width: '400px',
      height: '260px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getLeagues();
    });
  }

  joinLeague(event, leagueId) {
    for (let i = 0; i < this.userLeagues.length; i++) {
      if (leagueId === this.userLeagues[i].id) {
        this._notificationsService.error(
          'Error',
          'You already joined this league',
          {
            timeOut: 5000,
            showProgressBar: true
          }
        );
        return;
      }
    }
    this.leagueService.joinLeague(leagueId).subscribe(res => {
      this.getLeagues();
    });
  }
}
