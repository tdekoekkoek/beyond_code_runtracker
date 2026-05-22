import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'add-session',
    loadComponent: () => import('./add-session/add-session.component').then(m => m.AddSessionComponent)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
