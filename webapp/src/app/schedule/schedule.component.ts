import { Component, OnInit } from "@angular/core";
import { Http } from "@angular/http";

@Component({
  selector: "app-schedule",
  templateUrl: "./schedule.component.html",
  styleUrls: ["./schedule.component.scss"]
})
export class ScheduleComponent implements OnInit {
  private games: object;
  private selectedSeason: string;
  private seasons: Array<string> = [];
  constructor(private http: Http) {
    for (let i = 2017; i > 2000; i--) {
      this.seasons.push(`${i - 1}-${i}-regular`);
      this.seasons.push(`${i}-playoff`);
    }
    this.selectedSeason = this.seasons[0];
  }

  ngOnInit() {}

  searchSchedule(event: any) {
    this.http
      .get(`http://localhost:8080/schedule/${this.selectedSeason}/2017-05-03`)
      .map(res => res.json())
      .subscribe(_games => {
        if (!_games) {
          return [];
        }
        this.games = _games.scoreboard.gameScore;
        console.log(this.games);
      });
  }
}
