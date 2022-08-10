import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelloWorld } from '@builder.io/components/angular';
import { ToDoApp } from '@builder.io/components/angular';

const routes: Routes = [
  { path: '', component: HelloWorld },
  { path: 'todo', component: ToDoApp },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
