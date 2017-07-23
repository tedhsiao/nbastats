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
  constructor(private http: Http) {}

  ngOnInit() {}

  searchPlayer(event: any) {
    this.http
      .get(`http://localhost:8080/player/2016-playoff/${this.playerName}`)
      .map(res => res.json())
      .subscribe(stats => {
        console.log(stats);
        this.player = stats.cumulativeplayerstats.playerstatsentry[0].player;
        this.stats = [stats.cumulativeplayerstats.playerstatsentry[0].stats];
        this.team = stats.cumulativeplayerstats.playerstatsentry[0].team;
      });
  }
}
