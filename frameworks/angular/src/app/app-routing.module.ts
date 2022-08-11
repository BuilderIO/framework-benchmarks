import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import ToDoApp from './generated-components/components/todo-app';
import HelloWorld from './generated-components/components/hello-world';

const routes: Routes = [
  { path: '', component: HelloWorld },
  { path: 'todo', component: ToDoApp },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
