import { Component, OnInit } from '@angular/core';
import { FbconnectionService } from '../fbconnection.service';
import { onAuthStateChanged } from 'firebase/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userId:any;
  loginState=false;
  constructor(private firebase:FbconnectionService) { }

  ngOnInit(): void {
    onAuthStateChanged(this.firebase.auth,(user)=>{
      if(user&&user!==null){
        this.loginState=true;
        this.userId=user.uid;
      }
    })
  }

}
