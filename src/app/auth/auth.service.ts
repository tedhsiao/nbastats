import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import "rxjs/add/operator/filter";
import * as auth0 from "auth0-js";
import { Http } from "@angular/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs/Rx";

let { redirectUrl, apiUrl } = environment;

@Injectable()
export class AuthService {
  auth0 = new auth0.WebAuth({
    clientID: "e1BYpFuXyF1GeGivi5ol1r8cI3iqcs1e",
    domain: "thsiao.auth0.com",
    responseType: "token id_token",
    audience: "https://thsiao.auth0.com/userinfo",
    redirectUri: redirectUrl,
    scope: "openid profile email"
  });

  constructor(public router: Router, private http: Http) {}

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = "";
        this.setSession(authResult);
        this.router.navigate(["/player"]);
      } else if (err) {
        this.router.navigate(["/player"]);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem(
      "id_token_payload",
      JSON.stringify(authResult.idTokenPayload)
    );
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", expiresAt);
    let id_token_payload = JSON.parse(localStorage.getItem("id_token_payload"));
    let id_token = localStorage.getItem("id_token");
    let access_token = localStorage.getItem("access_token");
    this.http
      .post(`${apiUrl}user`, {
        id_token_payload,
        access_token,
        id_token
      })
      .map(res => {
        return res.json();
      })
      .subscribe(res => {
        console.log(res);
      });
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token_payload");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    // Go back to the home route
    this.router.navigate(["/"]);
  }

  public getUser(): any {
    let user = JSON.parse(localStorage.getItem("id_token_payload"));
    return user ? user : null;
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
  }
}
