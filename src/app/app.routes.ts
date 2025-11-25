import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'movies',
        loadComponent: () => import('./pages/index').then((p) => p.Home)
    },
    {
        path: 'movie/:id',
        loadComponent: () => import('./pages/index').then((p) => p.Movie)
    },
    {
        path: '**',
        redirectTo: 'movies'
    }
];
