import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  // {
  //   path: '',
  //   loadChildren: () =>
  //     import('security/LoginModule').then((m) => m.LoginModule),
  //   pathMatch: 'full',
  // },
  // {
  //   path: 'login',
  //   loadChildren: () =>
  //     import('security/LoginModule').then((m) => m.LoginModule),
  //   pathMatch: 'full',
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
