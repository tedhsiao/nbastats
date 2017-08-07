import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Rx';
import { URLSearchParams } from '@angular/http';

let { apiUrl } = environment;

@Injectable()
export class UserService {
  constructor(private http: HttpService) {}

  updateUser(_user) {
    return this.http.put(`${apiUrl}user`, _user).map(res => {
      return res.json();
    });
  }

  getUserInfo(_userSub) {
    let params: URLSearchParams = new URLSearchParams();
    params.append('sub', _userSub);
    return this.http.get(`${apiUrl}user`, { search: params }).map(res => {
      return res.json();
    });
  }
}
