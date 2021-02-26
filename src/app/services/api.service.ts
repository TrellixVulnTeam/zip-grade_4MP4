import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Result } from '../models/result';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url ='http://quiz.uzeyrozcan.com/';

  constructor(private http: HttpClient) { }

  getConfig() {
    return this.http.get(this.url+'user');
  }
  quizz() {
    return this.http.get<Result>(this.url+'quizz');
  }

  students() {
    return this.http.get<Result>(this.url+'studentss');
  }
  classes() {
    return this.http.get<Result>(this.url+'classess');
  }

  
}
