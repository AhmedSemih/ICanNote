import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  //Form Elements
  loginForm=new FormGroup({
    email:new FormControl(null,Validators.required),
    pass:new FormControl(null,Validators.required)
  });

  //Firebase Connection
  firebaseConfig = {
      apiKey: "AIzaSyA5L8XPq7NlpPcHx4E9u9hUwJY_80C2jds",
      authDomain: "todoapp-e44a6.firebaseapp.com",
      projectId: "todoapp-e44a6",
      storageBucket: "todoapp-e44a6.appspot.com",
      messagingSenderId: "425933034571",
      appId: "1:425933034571:web:8638b5b7a39667deef29ce",
      measurementId: "G-Z4HKPB2XFW"
  };
  app = initializeApp(this.firebaseConfig);
  auth=getAuth();

  //Form Submit Actions
  onSubmit(){
    signInWithEmailAndPassword(this.auth,this.loginForm.get('email')?.value,this.loginForm.get('pass')?.value)
    .then(()=>{

    })
    .catch(error=>{
      Swal.fire({
        title:'Failed',
        text:error.message,
        icon:'error',
        timer:2000,
      })
    })
  }

  constructor() { }

  ngOnInit(): void {
  }


}
