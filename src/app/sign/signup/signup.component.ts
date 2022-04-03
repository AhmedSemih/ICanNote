import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signForm=new FormGroup({
    email:new FormControl(null,[
      Validators.email,
      Validators.required
    ]),
  pass:new FormControl(null,[
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20)
    ])
  });

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

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){
    let email=this.signForm.get('email')?.value;
    let pass=this.signForm.get('pass')?.value;
    createUserWithEmailAndPassword(this.auth,email,pass)
    .then(()=>{
      Swal.fire({
        title:'Success',
        text:'Account created successfully.',
        icon:'success',
        showConfirmButton:true,
        confirmButtonText:'OK'
      })
    })
    .catch(()=>{
      Swal.fire(
        {title:'Failed',
        text:'This email already in use.',
        icon:'error',
        showConfirmButton:true,
        confirmButtonText:'OK'
        }
      )
    })
  }
}
