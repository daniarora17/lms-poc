import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CommandService {
  homeURL = 'http://localhost:8000/api/home';
  constructor(private http: HttpClient) {
  }

  getCommandData(body) {
    if (body) {
      return this.http.post<any>(this.homeURL, body);
    }
  }
}
