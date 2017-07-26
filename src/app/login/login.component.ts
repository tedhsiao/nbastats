import { Component, OnInit } from "@angular/core";
import {
  Location,
  LocationStrategy,
  PathLocationStrategy
} from "@angular/common";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  public currentPath: string;
  constructor(location: Location) {
    this.currentPath = location.path();
  }

  ngOnInit() {}
}
