import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Class } from '../models/class';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.scss']
})
export class ClassListComponent implements OnInit {

  displayedColumns = ['name','edit'];
  tmp: boolean;
  dataSource = new MatTableDataSource();
  class: Class;




  constructor(private readonly api: ApiService) { }

  data: any[];
  ngOnInit(): void {
    this.tmp = true;
    this.onLoad();
   
  }

  onBlurMethod(item: any){
    this.api.classUpdate(item).subscribe(data=>{
      console.log(data);
    })
  }
  onLoad(){
    this.api.class().subscribe(data =>{
      this.tmp = false;
      this.dataSource.data = data.data;
    });
  }
  new(){
    console.log(999)
    this.class = new Class();
    this.class.name = 'New Class Def';
    this.api.classSave(this.class).subscribe(data=>{
      console.log(data);
      this.onLoad();
    });
    
  }
  deleteRow(item: any){
    this.api.classDelete(item).subscribe(data=>{
      this.onLoad();
    })
  }

}
