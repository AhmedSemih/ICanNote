import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
{path:'',loadChildren:()=>import('../app/sign/sign.module').then(m=>m.SignModule)},
{path:'home',loadChildren:()=>import('../app/home/home.module').then(m=>m.HomeModule)},
{path:'**',component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
