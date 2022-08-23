import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: async () =>
      (await import('./generated-components/components/hello-world')).default,
  },
  {
    path: 'todo',
    loadComponent: async () =>
      (await import('./generated-components/components/todo-app')).default,
  },
  {
    path: 'dashboard',
    loadComponent: async () =>
      (await import('./generated-components/components/dashboard')).default,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
