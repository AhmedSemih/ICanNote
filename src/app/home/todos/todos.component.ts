import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todoForm=new FormGroup({
    text:new FormControl(null,Validators.required),
    date:new FormControl(null)
  });

  onSubmit(){

  }


  constructor() { }

  ngOnInit(): void {
  }

}
