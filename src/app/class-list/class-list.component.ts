import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.scss']
})
export class ClassListComponent implements OnInit {

  constructor(private readonly apiService: ApiService) { }

  data: any[];
  ngOnInit(): void {
    this.apiService.classes().subscribe(data=>{
      console.log(data);
      this.data = data.data;
    })
  }

}
