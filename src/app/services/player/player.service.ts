import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Rx';

let apiUrl = environment.apiUrl;

@Injectable()
export class PlayerService {
  constructor(private http: HttpService) {}

  getStats(season, player): Observable<any> {
    return this.http
      .get(apiUrl + `player/${season}/${player}`)
      .map(res => {
        return res.json();
      })
      .catch((error: any) => {
        return Observable.throw(error || 'Server error');
      });
  }
}
