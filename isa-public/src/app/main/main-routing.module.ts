import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MainComponent } from './main.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { BCRegisterComponent } from './pages/bc-register/bc-register.component';
import { BCAdminRegisterComponent } from './pages/bc-admin-register/bc-admin-register.component';
import { BCAllComponent } from './pages/bc-all/bc-all.component';
import { BCAdminAssignComponent } from './pages/bc-admin-assign/bc-admin-assign.component';
import { RoleGuard } from '../auth/guards/role.guard';

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'bc-register',
        component: BCRegisterComponent,
        canActivate: [RoleGuard],
        data: { roles: ["ROLE_ADMIN"] }
      },
      {
        path: 'bc-admin-register',
        component: BCAdminRegisterComponent,
        canActivate: [RoleGuard],
        data: { roles: ["ROLE_ADMIN"] }
      },
      {
        path: 'bc-admin-assign',
        component: BCAdminAssignComponent,
        canActivate: [RoleGuard],
        data: { roles: ["ROLE_ADMIN"] }
      },
      {
        path: 'bc-all',
        component: BCAllComponent
      },
      {
        path: 'bc-dashboard',
        loadChildren: () => import('./modules/bc-dashboard/bc-dashboard.module').then(m => m.BCDashboardModule),
        canActivate: [RoleGuard],
        data: { roles: ["ROLE_BCADMIN"] }
      },
      {
        path: 'all-users',
        loadChildren: () => import('./modules/all-users/all-users.module').then(m => m.AllUsersModule),
        canActivate: [RoleGuard],
        data: { roles: ["ROLE_ADMIN"] }
      },
      {
        path: 'profile',
        loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule),
        canActivate: [RoleGuard]
      },
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: '**', component: PageNotFoundComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
