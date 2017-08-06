import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { LeagueService } from '../services/league/league.service';

@Component({
  selector: 'app-create-league-dialog',
  templateUrl: './create-league-dialog.component.html',
  styleUrls: ['./create-league-dialog.component.scss']
})
export class CreateLeagueDialogComponent implements OnInit {
  public newLeagueForm: any = {};
  public leagues: object;
  constructor(
    private leagueService: LeagueService,
    public dialogRef: MdDialogRef<CreateLeagueDialogComponent>
  ) {}

  ngOnInit() {}

  createLeague(event) {
    this.leagueService.createLeague(this.newLeagueForm).subscribe(res => {
      console.log(res);
    });
  }
}
