import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Result } from '../models/result';
import { Quiz } from '../models/quiz';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public url ='http://quiz.uzeyrozcan.com/';

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
  questionSave(form: Quiz) {
    return this.http.post<Result>(this.url+'question/save',form);
  }
  questionUpdate(form: Quiz) {
    return this.http.post<Result>(this.url+'question/update',form);
  }
  questions() {
    return this.http.get<Result>(this.url+'question/list');
  }

  quiz() {
    return this.http.get<Result>(this.url+'quiz/list');
  }

  
}
