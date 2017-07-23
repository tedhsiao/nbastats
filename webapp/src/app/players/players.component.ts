import { Component, OnInit } from "@angular/core";
import { Http } from "@angular/http";

@Component({
  selector: "app-players",
  templateUrl: "./players.component.html",
  styleUrls: ["./players.component.css"]
})
export class PlayersComponent implements OnInit {
  private playerName: string;
  private player: object;
  private stats: object;
  private team: object;
  private noPlayerFoundFlag: boolean = false;
  private seasons: Array<string> = [];
  private selectedSeason: string;

  constructor(private http: Http) {
    for (let i = 2017; i > 2000; i--) {
      this.seasons.push(`${i - 1}-${i}-regular`);
      this.seasons.push(`${i}-playoff`);
    }
    this.selectedSeason = this.seasons[0];
  }

  ngOnInit() {}

  searchPlayer(event: any) {
    this.http
      .get(
        `http://localhost:8080/player/${this.selectedSeason}/${this.playerName}`
      )
      .map(res => res.json())
      .subscribe(stats => {
        if (!stats.cumulativeplayerstats.playerstatsentry) {
          this.player = null;
          this.noPlayerFoundFlag = true;
          return;
        }
        this.noPlayerFoundFlag = false;
        this.player = stats.cumulativeplayerstats.playerstatsentry[0].player;
        this.stats = [stats.cumulativeplayerstats.playerstatsentry[0].stats];
        this.team = stats.cumulativeplayerstats.playerstatsentry[0].team;
      });
  }
}
