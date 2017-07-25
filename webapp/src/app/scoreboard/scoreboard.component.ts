import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-scoreboard",
  templateUrl: "./scoreboard.component.html",
  styleUrls: ["./scoreboard.component.scss"]
})
export class ScoreboardComponent implements OnInit {
  private url: string;
  constructor() {}

  @Input() game: any;
  @Input() season: string;
  @Input() detailButton: boolean = true;

  ngOnInit() {
    let date = this.game.game.date.split("");
    this.url = `/boxscore/${this.season}/${this.game.game.date
      .split("-")
      .join("")}/${this.game.game.awayTeam.Abbreviation}-${this.game.game
      .homeTeam.Abbreviation}`;
  }

  sumScore(scores, key) {
    return scores.reduce((acc, curr) => {
      return acc + +curr[key];
    }, 0);
  }
}
