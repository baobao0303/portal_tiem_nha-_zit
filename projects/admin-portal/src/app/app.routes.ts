import { Routes } from '@angular/router';
import { AuthorizationGuard, UnauthorizationGuard } from '@infrastructure/authorization';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [UnauthorizationGuard],
    loadComponent: () => import('./pages/auth/login.component').then(c => c.LoginComponent)
  },
  {
    path: '',
    canActivate: [AuthorizationGuard],
    loadComponent: () => import('./pages/hub/hub.component').then(c => c.HubComponent),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'categories', loadComponent: () => import('./pages/categories/categories.component').then(m => m.CategoriesComponent) },
      { path: 'products', loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent) },
      { path: 'orders', loadComponent: () => import('./pages/orders/orders.component').then(m => m.OrdersComponent) }
    ]
  }
];
