import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  data: any[];

  constructor(private readonly apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.students().subscribe(data=>{
      console.log(data);
      this.data = data.data;
    })
  }

}
