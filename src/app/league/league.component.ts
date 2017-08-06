import { CreateLeagueDialogComponent } from './../create-league-dialog/create-league-dialog.component';
import { Component, OnInit } from '@angular/core';
import { LeagueService } from '../services/league/league.service';
import { MdDialog, MdDialogRef } from '@angular/material';

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
  constructor(private leagueService: LeagueService, public dialog: MdDialog) {}

  ngOnInit() {
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
      console.log(result);
    });
  }
}
