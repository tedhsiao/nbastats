import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Rx';
import { URLSearchParams } from '@angular/http';
import { AuthService } from '../auth/auth.service';

let apiUrl = environment.apiUrl;

@Injectable()
export class LeagueService {
  constructor(private http: HttpService, private authService: AuthService) {}

  createLeague(createLeagueForm): Observable<any> {
    return this.http
      .post(apiUrl + `league`, createLeagueForm)
      .map(res => {
        return res.json();
      })
      .catch((error: any) => {
        return Observable.throw(error || 'Server error');
      });
  }

  joinLeague(leagueId): Observable<any> {
    return this.http
      .post(apiUrl + `league/join`, { leagueId })
      .map(res => {
        return res.json();
      })
      .catch((error: any) => {
        return Observable.throw(error || 'Server error');
      });
  }

  getLeagues(userId?: string): Observable<any> {
    let params: URLSearchParams = new URLSearchParams();
    if (userId) {
      params.append('userId', userId);
    }
    return this.http
      .get(apiUrl + `league`, { search: params })
      .map(res => {
        return res.json();
      })
      .catch((error: any) => {
        return Observable.throw(error || 'Server error');
      });
  }
}
