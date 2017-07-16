import { Component, OnInit } from "@angular/core";
import { Http } from "@angular/http";
@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.css"]
})
export class LoginFormComponent implements OnInit {
  constructor(private http: Http) {}
  public username: string;
  public password: string;
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
}
