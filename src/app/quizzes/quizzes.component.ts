import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import readXlsxFile from 'read-excel-file';
import { Excel } from '../models/excel';
import { MatTableDataSource } from '@angular/material/table';
import { Class } from '../models/class';
import { Quiz } from '../models/quiz';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.scss']
})
export class QuizzesComponent implements OnInit {
  tmpData: Excel[];
  excelTmp: Excel;
  tmp: boolean;
  quiz: Quiz;

  displayedColumns = ['quiz_name','edit'];
  dataSource = new MatTableDataSource();

  constructor(private readonly api: ApiService) {
    this.onLoad();
    this.tmp = false;

  }
  onLoad(){
    this.api.quiz().subscribe(data =>{
      this.dataSource.data = data.data;
    });
  }
 ngOnInit(): void {
 
  }
  onBlurMethod(item: any){
    this.api.questionUpdate(item).subscribe(data=>{
      console.log(data);
    })
  }
  deleteRow(item: any){
    this.api.quizDelete(item).subscribe(data=>{
      this.onLoad();
    })
  }
  new(){
    console.log(999)
    this.quiz = new Quiz();
    this.quiz.quiz_name = 'New Class Def';
    this.api.quizSave( this.quiz).subscribe(data=>{
      console.log(data);
      this.onLoad();
    });
    
  }
  public fileUpload(files) {
    console.log(999)
    const file: File = files.item(0);
    this.tmpData=[];
    readXlsxFile(file).then((rows) => {
      for (let index = 0; index < rows.length; index++) {
        const element = rows[index];
        let excel: Excel;
        excel = new Excel();
        excel.classCode = element[0];
        excel.className = element[1];
        excel.studentCode = element[2];
        excel.studentName = element[3];
        this.tmpData.push(excel);
          
      }
      this.tmp = true;

    });
  }

}
