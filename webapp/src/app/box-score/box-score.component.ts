import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Http } from "@angular/http";
import { environment } from "../../environments/environment";

let apiUrl = environment.apiUrl;

@Component({
  selector: "app-box-score",
  templateUrl: "./box-score.component.html",
  styleUrls: ["./box-score.component.scss"]
})
export class BoxScoreComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private http: Http) {}
  private gameBoxScore: any;

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.http
        .get(
          apiUrl +
            `schedule/boxscore/${params.season}/${params.date}/${params.teams}`
        )
        .map(res => res.json())
        .subscribe(res => {
          if (!res) {
            this.gameBoxScore = null;
            return;
          }
          this.gameBoxScore = res.gameboxscore;
          console.log(this.gameBoxScore.homeTeam.homePlayers.playerEntry);
        });
    });
  }
}
