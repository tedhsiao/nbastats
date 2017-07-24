import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-scoreboard",
  templateUrl: "./scoreboard.component.html",
  styleUrls: ["./scoreboard.component.scss"]
})
export class ScoreboardComponent implements OnInit {
  constructor() {}

  @Input() game: object;

  ngOnInit() {}
}
