import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-player-stats",
  templateUrl: "./player-stats.component.html",
  styleUrls: ["./player-stats.component.scss"]
})
export class PlayerStatsComponent implements OnInit {
  constructor() {}

  @Input() rows: object = [];

  @Input() columns: object = [];

  ngOnInit() {}
}
