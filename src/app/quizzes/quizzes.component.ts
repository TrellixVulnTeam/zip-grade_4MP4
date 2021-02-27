import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import readXlsxFile from 'read-excel-file';
import { Excel } from '../models/excel';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.scss']
})
export class QuizzesComponent implements OnInit {
  tmpData: Excel[];
  excelTmp: Excel;
  tmp: boolean;

  displayedColumns = ['quiz_name'];
  dataSource = new MatTableDataSource();

  constructor(private readonly api: ApiService) {
    this.api.quiz().subscribe(data =>{
      this.dataSource.data = data.data;
    });
    this.tmp = false;

  }
 ngOnInit(): void {
 
  }
  onBlurMethod(item: any){
    this.api.questionUpdate(item).subscribe(data=>{
      console.log(data);
    })
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
