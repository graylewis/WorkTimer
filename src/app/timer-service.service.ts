import { baseUrl } from './../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TimerServiceService {

  constructor(private http:HttpClient) { }

  saveEntries(data: any):Observable<any>{
    return this.http.post(`${baseUrl}/save`, data);
  }

  fetchWorkbook():Observable<any>{
    return this.http.get(`${baseUrl}/workbook`);
  }
}
