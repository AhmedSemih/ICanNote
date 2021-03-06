import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {signInWithEmailAndPassword ,setPersistence,browserSessionPersistence,browserLocalPersistence, onAuthStateChanged, getAuth} from "firebase/auth";
import { FbconnectionService } from 'src/app/fbconnection.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  userStatus=false;

  //Form Elements
  loginForm=new FormGroup({
    email:new FormControl(null,Validators.required),
    pass:new FormControl(null,Validators.required),
    remember:new FormControl(false)
  });

  //Form Submit Actions
  onSubmit(){

      //Login
      signInWithEmailAndPassword(this.firebase.auth,this.loginForm.get('email')?.value,this.loginForm.get('pass')?.value)
      .then(()=>{
      //Remember me action
      if(this.loginForm.get('remember')?.value){
        setPersistence(this.firebase.auth,browserLocalPersistence)
        .then(()=>
        {
          return signInWithEmailAndPassword(this.firebase.auth,this.loginForm.get('email')?.value,this.loginForm.get('pass')?.value)
        })
      }
      else{
        setPersistence(this.firebase.auth,browserSessionPersistence)
        .then(()=>{
          return signInWithEmailAndPassword(this.firebase.auth,this.loginForm.get('email')?.value,this.loginForm.get('pass')?.value)
        })
      }
      this.router.navigate(['/home']);
    })
    .catch(()=>{
      Swal.fire({
        title:'Failed',
        text:'Wrong Password',
        icon:'error',
        timer:2000,
      })
      this.loginForm.get('pass')?.reset();
    })
  }

  //Password Toggle
  togglePass(e:any){
    let input=e.previousElementSibling;
    input.type==='password'?input.type='text':input.type='password';
  }

  constructor(private router:Router,private firebase:FbconnectionService) { }

  ngOnInit(): void {

    //Remember me check
    onAuthStateChanged(this.firebase.auth,user=>{
      if(user&&user!==null){
        this.userStatus=true;
        setTimeout(()=>{
          this.router.navigate(['/home']);
        },500);
      }
    })
}
}
