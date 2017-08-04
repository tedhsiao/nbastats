import { Component, OnInit } from "@angular/core";
import { LeagueService } from "../services/league/league.service";

@Component({
  selector: "app-league",
  templateUrl: "./league.component.html",
  styleUrls: ["./league.component.scss"]
})
export class LeagueComponent implements OnInit {
  public newLeagueForm: any = {};
  public leagues: object;
  constructor(private leagueService: LeagueService) {}

  ngOnInit() {
    this.leagueService.getLeagues().subscribe(leagues => {
      this.leagues = leagues;
    });
  }

  createLeague(event) {
    this.leagueService.createLeague(this.newLeagueForm.name).subscribe(res => {
      console.log(res);
    });
  }
}
