import { Component, OnInit } from '@angular/core';
import { FbconnectionService } from '../fbconnection.service';
import { onAuthStateChanged } from 'firebase/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userId:any;
  loginState=false;
  constructor(private firebase:FbconnectionService,private router:Router) { }

  ngOnInit(): void {

    //Login Check
    onAuthStateChanged(this.firebase.auth,(user)=>{
      if(user&&user!==null){
        this.loginState=true;
        this.userId=user.uid;
      }
    });

    setTimeout(()=>{
      if(!this.loginState){
        this.router.navigate(['/login']);
      }
    },200);
  }

}
