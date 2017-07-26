import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs/Rx";

let apiUrl = environment.apiUrl;

@Injectable()
export class PlayerService {
  constructor(private http: Http) {}

  getStats(season, player): Observable<any> {
    return this.http
      .get(apiUrl + `player/${season}/${player}`)
      .map(res => {
        return res.json();
      })
      .catch((error: any) =>
        Observable.throw(error.json().error || "Server error")
      );
  }
}
