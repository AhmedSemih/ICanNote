import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
    uname:new FormControl(null,[
      Validators.required,
      Validators.maxLength(20),
      Validators.minLength(5),
      Validators.pattern('^[a-zA-Z0-9]+$')
    ]),
    pass:new FormControl(null,[
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20)
    ])
  })

  constructor() { }

  ngOnInit(): void {
  }

}
