import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isCollapsed: boolean;
  user: object;
  constructor(private auth: AuthService, private router: Router) {
    this.isCollapsed = true;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.user = this.auth.getUser();
      }
    });
    auth.handleAuthentication();
  }

  ngOnInit() {}
}
