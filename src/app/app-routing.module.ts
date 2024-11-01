import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [

   {path:"login", component:LoginComponent, pathMatch:"full"},
   {path:"register", component:RegisterComponent, pathMatch:"full"},

   { path: 'admin', loadChildren: () => import('./Module/admin/admin.module').then(m => m.AdminModule) },

   { path: 'customer', loadChildren: () => import('./Module/customer/customer.module').then(m => m.CustomerModule) },


   {path:'**',
    pathMatch:"full",
    redirectTo:'login'
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
