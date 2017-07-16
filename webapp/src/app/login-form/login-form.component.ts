import { Component, OnInit, Input } from "@angular/core";
import { Http } from "@angular/http";
import {
  Location,
  LocationStrategy,
  PathLocationStrategy
} from "@angular/common";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.css"]
})
export class LoginFormComponent implements OnInit {
  @Input() path: string;
  public username: string;
  public password: string;
  public currentPath: string;
  constructor(private http: Http, private location: Location) {
    this.currentPath = location.path();
  }

  ngOnInit() {}

  login(event) {
    let _username = this.username;
    let _password = this.password;
    this.http
      .post("/login", {
        username: _username,
        password: _password
      })
      .subscribe(data => {
        console.log("data sent");
      });
  }

  signup(event) {
    let _username = this.username;
    let _password = this.password;
    this.http
      .post("/signup", {
        username: _username,
        password: _password
      })
      .subscribe(data => {
        console.log("data sent");
      });
  }
}
