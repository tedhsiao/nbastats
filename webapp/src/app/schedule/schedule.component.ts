import { Component, OnInit } from "@angular/core";
import { Http } from "@angular/http";
import { DatePickerOptions, DateModel } from "ng2-datepicker";

@Component({
  selector: "app-schedule",
  templateUrl: "./schedule.component.html",
  styleUrls: ["./schedule.component.scss"]
})
export class ScheduleComponent implements OnInit {
  private games: object = [];
  private selectedSeason: string;
  private seasons: Array<string> = [];
  private date: DateModel;
  private options: DatePickerOptions;

  constructor(private http: Http) {
    for (let i = 2017; i > 2000; i--) {
      this.seasons.push(`${i}-playoff`);
      this.seasons.push(`${i - 1}-${i}-regular`);
    }
    this.selectedSeason = this.seasons[0];
    this.options = new DatePickerOptions();
  }

  ngOnInit() {}

  searchSchedule(event: any) {
    let date: string;
    date = this.date.formatted.split("-").join("");
    this.http
      .get(`http://localhost:8080/schedule/${this.selectedSeason}/${date}`)
      .map(res => res.json())
      .subscribe(res => {
        if (!res) {
          this.games = null;
          return;
        }
        this.games = res.scoreboard.gameScore;
      });
  }
}
