import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelloWorld, AppHeader, ToDoApp } from '@builder.io/components/angular';

@Component({
  standalone: true,
  imports: [CommonModule, AppHeader],
  template: ` <app-header></app-header> `,
})
class TodoRoute {}

const routes: Routes = [
  { path: '', component: HelloWorld },
  { path: 'todo', component: TodoRoute },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
