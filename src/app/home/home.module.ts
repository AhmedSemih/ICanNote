import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TodosComponent } from './todos/todos.component';
import { NotesComponent } from './notes/notes.component';


@NgModule({
  declarations: [
    HomeComponent,
    TodosComponent,
    NotesComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
