import { Injectable } from "@angular/core";
import { HttpService } from "../http/http.service";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs/Rx";
import { URLSearchParams } from "@angular/http";
import { AuthService } from "../../auth/auth.service";

let apiUrl = environment.apiUrl;

@Injectable()
export class LeagueService {
  constructor(private http: HttpService, private authService: AuthService) {}

  createLeague(name): Observable<any> {
    return this.http
      .post(apiUrl + `league`, { name })
      .map(res => {
        return res.json();
      })
      .catch((error: any) => {
        return Observable.throw(error || "Server error");
      });
  }

  getLeagues(): Observable<any> {
    let userId = this.authService.getUserId();
    let params: URLSearchParams = new URLSearchParams();
    params.append("userId", userId);
    return this.http
      .get(apiUrl + `league`, { search: params })
      .map(res => {
        return res.json();
      })
      .catch((error: any) => {
        return Observable.throw(error || "Server error");
      });
  }
}
