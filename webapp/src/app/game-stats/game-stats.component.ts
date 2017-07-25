import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-game-stats",
  templateUrl: "./game-stats.component.html",
  styleUrls: ["./game-stats.component.scss"]
})
export class GameStatsComponent implements OnInit {
  constructor() {}

  @Input() players: any;

  ngOnInit() {}
}
