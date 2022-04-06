import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import {Router} from "@angular/router";
import Swal from 'sweetalert2';
import { FbconnectionService } from 'src/app/fbconnection.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  //Form Elements
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

  //Form Submit Actions
  onSubmit(){
    let email=this.signForm.get('email')?.value;
    let pass=this.signForm.get('pass')?.value;
    createUserWithEmailAndPassword(this.firebase.auth,email,pass)
    .then(()=>{
      signOut(this.firebase.auth);
      Swal.fire({
        title:'Success',
        text:'Account created successfully.',
        icon:'success',
        showConfirmButton:true,
        confirmButtonText:'OK',
        timer:2000,
      }).then(()=>{
       this.router.navigate(['/login'])
      })
    })
    .catch(()=>{
      Swal.fire(
        {title:'Failed',
        text:'This email already in use.',
        icon:'error',
        showConfirmButton:true,
        confirmButtonText:'OK',
        timer:2000
        }
      )
      this.signForm.get('email')?.reset();
    })
  }

  //Toggle Password
  togglePass(e:any){
    let input=e.previousElementSibling;
    input.type==='password'?input.type='text':input.type='password';
  }

  constructor(private router:Router,private firebase:FbconnectionService) { }

  ngOnInit(): void {
  }


}
