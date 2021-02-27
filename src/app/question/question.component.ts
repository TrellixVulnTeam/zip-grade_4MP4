import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { GeneralForm } from '../models/generalForm';
import { Quiz } from '../models/quiz';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {


  public formGroup;
  displayedColumns = ['content'];
  dataSource = new MatTableDataSource();
  public modelConvert = new GeneralForm();
  public quiz: Quiz;


  constructor(private readonly api: ApiService) {
    this.quiz = new Quiz();
    this.formGroup = this.modelConvert.convertModelToQuizFormGroup(this.quiz);
    this.api.questions().subscribe(data =>{
      this.dataSource.data = data.data;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  ngOnInit(): void {
    //this.onSubmit();
  }
  onBlurMethod(item: Quiz){
    this.api.questionUpdate(item).subscribe(data=>{
      console.log(data);
    })
  }
  onSubmit(){
    let tmp = new Quiz();
    tmp.content ='adas123131313131123123das';
    
    this.api.questionSave(tmp).subscribe(data=>{
      console.log(data)
    })
    console.log(this.formGroup.value);
    
  } 



}


 