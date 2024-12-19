import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'rate',
        loadComponent: () =>
          import('../rate/rate.page').then((m) => m.RatePage),
      },
      {
        path: 'group',
        loadComponent: () =>
          import('../group/group.page').then((m) => m.GroupPage),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('../profile/profile.page').then((m) => m.ProfilePage),
      },
      {
        path: '',
        redirectTo: '/tabs/rate',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/rate',
    pathMatch: 'full',
  },
];
