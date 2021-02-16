import { baseUrl } from './../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http:HttpClient) { }
  login(data: any):Observable<any>{
    return this.http.post(`${baseUrl}/login`, data);
  }

  isLoggedIn() {
    console.log(localStorage.getItem('token'))
    return (localStorage.getItem('token')) ? true:false
  }
}
