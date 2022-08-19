import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import ToDoApp from './generated-components/components/todo-app';
import HelloWorld from './generated-components/components/hello-world';
import Dashboard from './generated-components/components/dashboard';

const routes: Routes = [
  { path: '', component: HelloWorld },
  { path: 'todo', component: ToDoApp },
  { path: 'dashboard', component: Dashboard },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
