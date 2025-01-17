import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'rate',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('../rate/rate.page').then((m) => m.RatePage),
          },
          {
            path: ':ean',
            loadComponent: () =>
              import('../rate-product/rate-product.page').then(
                (m) => m.RateProductPage,
              ),
          },
        ],
      },
      {
        path: 'group',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('../group/group.page').then((m) => m.GroupPage),
          },
          {
            path: ':id',
            loadComponent: () =>
              import('../group-detail/group-detail.page').then(
                (m) => m.GroupDetailPage,
              ),
          },
        ],
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('../profile/profile.page').then((m) => m.ProfilePage),
      },
      {
        path: '',
        redirectTo: '/home/rate',
        pathMatch: 'full',
      },
    ],
  },
];
