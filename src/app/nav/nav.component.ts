import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit {
  isCollapsed: boolean;
  constructor(private auth: AuthService) {
    this.isCollapsed = true;
    auth.handleAuthentication();
  }

  ngOnInit() {}
}
