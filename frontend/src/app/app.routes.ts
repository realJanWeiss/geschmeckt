import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./welcome/welcome.page').then( m => m.WelcomePage)
  },
  {
    path: 'home',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
];
