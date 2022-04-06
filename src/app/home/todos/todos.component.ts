import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FbconnectionService } from 'src/app/fbconnection.service';
import {set, ref,onValue,push} from 'firebase/database';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  @Input() userId=null;

  todoCount=0;
  todoDatas:any=[];
  key='';
  hasChild=false;

  todoForm=new FormGroup({
    text:new FormControl(null,Validators.required),
    date:new FormControl('-')
  });

  //Add Data to Firebase
  onSubmit(){
    push(ref(this.firebase.db,'users/'+this.userId+'/todos/'),{
      text:this.todoForm.get('text')?.value,
      date:this.todoForm.get('date')?.value,
    }).then((idd:any)=>this.key=idd.key);

    setTimeout(()=>{
      set(ref(this.firebase.db,'users/'+this.userId+'/todos/'+this.key),{
        text:this.todoForm.get('text')?.value,
        date:this.todoForm.get('date')?.value,
        id:this.key
      });
      this.todoForm.reset();
      this.readData();
    },500)

  };

  //Delete Todo
  onChange(e:any){
    document.getElementById(e)!.parentElement!.style.opacity='0';
    setTimeout(()=>{
      set(ref(this.firebase.db,'users/'+this.userId+'/todos/'+e),{
        val:null
      });
    },1000)
  }

  //Read Todos
  readData(){
    var todoRef=ref(this.firebase.db,'users/'+this.userId+'/todos');
    onValue(todoRef,(snapshot)=>{
      this.todoDatas=[];
      let dataSnap=snapshot.val();
      if(this.hasChild){
      Object.keys(dataSnap).map(p=>{
        this.todoDatas.push(dataSnap[p])
      });
      this.todoCount=this.todoDatas.length;
    }
    });
  };

  //Delete All Todos
  onClickDelete(){
    setTimeout(()=>{
        set(ref(this.firebase.db,'users/'+this.userId+'/todos'),{
          val:null
        });
      },1000)
  }

  constructor(private firebase:FbconnectionService) { }

  ngOnInit(): void {

    var todoRef=ref(this.firebase.db,'users/'+this.userId+'/todos');
    onValue(todoRef,(snapshot)=>{
      this.hasChild=snapshot.hasChildren();
    });

    setTimeout(()=>{
        this.readData();
      },300)
    }

}
