import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import readXlsxFile from 'read-excel-file';
import { Excel } from '../models/excel';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.scss']
})
export class QuizzesComponent implements OnInit {

  constructor(private readonly apiService: ApiService) {
   

   }

  data: any[];
  tmpData: Excel[];
  excelTmp: Excel;
  tmp: boolean;
  ngOnInit(): void {
    this.apiService.quizz().subscribe(data=>{
      console.log(data);
      this.data = data.data;
    });
    this.tmp = false;

  }
  public fileUpload(files) {
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
