import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {signInWithEmailAndPassword ,setPersistence,browserSessionPersistence,browserLocalPersistence} from "firebase/auth";
import { FbconnectionService } from 'src/app/fbconnection.service';
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
    pass:new FormControl(null,Validators.required),
    remember:new FormControl(false)
  });

  //Form Submit Actions
  onSubmit(){

    //Remember me action
    this.loginForm.get('remember')?setPersistence(this.firebase.auth,browserLocalPersistence):setPersistence(this.firebase.auth,browserSessionPersistence);

    //Login
    signInWithEmailAndPassword(this.firebase.auth,this.loginForm.get('email')?.value,this.loginForm.get('pass')?.value)
    .then(()=>{
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

  constructor(private router:Router,private firebase:FbconnectionService) { }

  ngOnInit(): void {
  }


}
