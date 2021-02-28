import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Result } from '../models/result';
import { Quiz } from '../models/quiz';
import { Student } from '../models/student';


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
    return this.http.get<Result>(this.url+'class/list');
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
  student() {
    return this.http.get<Result>(this.url+'student/list');
  }
  studentUpdate(form: Quiz) {
    return this.http.post<Result>(this.url+'student/update',form);
  }
  studentSave(form: Student) {
    return this.http.post<Result>(this.url+'student/save',form);
  }
  studentClassSave(form: Student) {
    return this.http.post<Result>(this.url+'student/sc/save',form);
  }

}
