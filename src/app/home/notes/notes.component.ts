import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { signOut } from 'firebase/auth';
import { push,ref,set, onValue,DataSnapshot} from 'firebase/database';
import { FbconnectionService } from 'src/app/fbconnection.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  @Input() userId:any=null;
  key:any='';
  noteDatas:any=[];
  hasChild=false;
  noteCount=this.noteDatas.length;

  noteForm=new FormGroup({
    title:new FormControl(' '),
    text:new FormControl('',Validators.required)
  });

  //Add Note
  onSubmit(){
    push(ref(this.firebase.db,'users/'+this.userId+'/notes/'),{
      title:this.noteForm.get('title')?.value,
      text:this.noteForm.get('text')?.value,
    }).then((id:any)=>this.key=id.key);

    setTimeout(()=>{
      set(ref(this.firebase.db,'users/'+this.userId+'/notes/'+this.key),{
        title:this.noteForm.get('title')?.value,
        text:this.noteForm.get('text')?.value,
        id:this.key
      });
      this.noteForm.reset();
      this.readNote();
    },500)
  }

  //Read Datas
  readNote(){
    var noteRef=ref(this.firebase.db,'users/'+this.userId+'/notes');
    onValue(noteRef,(snapshot)=>{
      this.noteDatas=[];
      let dataSnap=snapshot.val();
      if(this.hasChild){
      Object.keys(dataSnap).map(p=>{
        this.noteDatas.push(dataSnap[p])
      });
      this.noteCount=this.noteDatas.length;
    }
    });
  };

  //Delete Selected Note
  onClickDel(id:any){
    setTimeout(()=>{
      set(ref(this.firebase.db,'users/'+this.userId+'/notes/'+id),{
        val:null
      });
    },500);
  };

  //Delete All Notes
  onClickDelAll(){
    set(ref(this.firebase.db,'users/'+this.userId+'/notes'),{
      val:null
    });
  }

  onClickLogout(){
    signOut(this.firebase.auth);
    this.router.navigate(['/login']);
  }

  constructor(private firebase:FbconnectionService,private router:Router) { }

  ngOnInit(): void {

      let baseRef=ref(this.firebase.db,'users/'+this.userId+'/notes/');
      onValue(baseRef,(snapshot)=>{
        this.hasChild=snapshot.hasChildren();
      });
      setTimeout(()=>{
        this.readNote();
      },300);
    }
}
