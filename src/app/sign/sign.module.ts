import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import { SignRoutingModule } from './sign-routing.module';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { BrandComponent } from './brand/brand.component';


@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent,
    BrandComponent
  ],
  imports: [
    CommonModule,
    SignRoutingModule,
    ReactiveFormsModule
  ]
})
export class SignModule { }
