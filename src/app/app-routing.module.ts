import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { AboutusComponent } from './component/aboutus/aboutus.component';
import { ContactComponent } from './component/contact/contact.component';
import { LoginComponent } from './component/login/login.component';
import { ForbiddenComponent } from './component/forbidden/forbidden.component';
import { AdminComponent } from './component/admin/admin.component';
import { UserComponent } from './component/user/user.component';
import { AuthGuard } from './auth/auth.guard';
import { ViewlinkComponent } from './component/viewlink/viewlink.component';
import { ManageuserComponent } from './component/manageuser/manageuser.component';
import { PaymentComponent } from './component/payment/payment.component';
import { SalesComponent } from './component/sales/sales.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'aboutus', component: AboutusComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'login', component:LoginComponent},
  {path: 'forbidden', component:ForbiddenComponent},
  {path: 'viewLink/:token', component:ViewlinkComponent},
  {path: 'admin', component:AdminComponent, canActivate:[AuthGuard], data:{role:'ADMIN'}},
  {path: 'sales', component:SalesComponent, canActivate:[AuthGuard], data:{role:'ADMIN'}},
  {path: 'sales', component:SalesComponent, canActivate:[AuthGuard], data:{role:'ADMIN'}},
  {path: 'manageuser', component:ManageuserComponent, canActivate:[AuthGuard], data:{role:'ADMIN'}},
  {path: 'user', component:UserComponent, canActivate:[AuthGuard], data:{role:'EMPLOYEE', role2:'ADMIN'}},
  {path: 'invoice', component:PaymentComponent, canActivate:[AuthGuard], data:{role:'EMPLOYEE', role2:'ADMIN'}},
  {path: '**', redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  //imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
