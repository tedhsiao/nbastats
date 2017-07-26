import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { GameService } from "../services/game/game.service";

@Component({
  selector: "app-box-score",
  templateUrl: "./box-score.component.html",
  styleUrls: ["./box-score.component.scss"]
})
export class BoxScoreComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private gameService: GameService
  ) {}
  public gameBoxScore: any;

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.gameService
        .getBoxscore(params.season, params.date, params.teams)
        .subscribe(res => {
          if (!res) {
            this.gameBoxScore = null;
            return;
          }
          this.gameBoxScore = res.gameboxscore;
        });
    });
  }
}
