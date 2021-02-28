import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../services/api.service';
import readXlsxFile from 'read-excel-file';
import { Student } from '../models/student';
import { FormControl } from '@angular/forms';
import { Class } from '../models/class';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  data: any[];
  displayedColumns = ['full_name','mail','student_id','class'];
  dataSource = new MatTableDataSource();
  tmp: boolean;
  toppingList: string[] = ['10-A','10-B','9-C','9-A'];
  classList: Class[];
  toppings = new FormControl();

  


  constructor(private readonly api: ApiService) {
    this.tmp = false;
  
    this.api.classes().subscribe(data =>{
      this.classList = data.data;
      this.onLoad();
    });
  }
  ngOnInit(): void {
   
  }
  onBlurMethod(item: any){
    this.api.studentUpdate(item).subscribe(data=>{
      console.log(data);
    })
  }
  onLoad(){
    this.api.student().subscribe(data => {
      this.dataSource.data = data.data;
      this.tmp = true;
      
    });

  }
  onFoodSelection1(item: any) {
    this.api.studentClassSave(item).subscribe(data=>{
      console.log(data);
    })
    console.log(item);
  }

  public fileUpload(files) {
    console.log(999)
    const file: File = files.item(0);
    readXlsxFile(file).then((rows) => {
      for (let index = 0; index < rows.length; index++) {
        const element = rows[index];
        let student: Student;
        student = new Student();
        student.student_id = element[0];
        student.full_name = element[1];
        student.mail = element[2] ? element[2]: '';
        this.api.studentSave(student).subscribe(data =>{
          console.log(data);
        });
      //  this.dataSource.data.push(student);
      }
      this.onLoad();

    });
  }


}
