import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs/Rx";

// Import RxJs required methods
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
let apiUrl = environment.apiUrl;

@Injectable()
export class GameService {
  constructor(private http: Http) {}

  getBoxscore(season, date, teams): Observable<any> {
    return this.http
      .get(apiUrl + `schedule/boxscore/${season}/${date}/${teams}`)
      .map(res => {
        return res.json();
      })
      .catch((error: any) =>
        Observable.throw(error.json().error || "Server error")
      );
  }

  getSchedules(season, date): Observable<any> {
    return this.http
      .get(apiUrl + `schedule/${season}/${date}`)
      .map(res => res.json())
      .catch((error: any) =>
        Observable.throw(error.json().error || "Server error")
      );
  }
}
