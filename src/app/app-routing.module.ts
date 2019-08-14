import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  // { 有问题
  //   path: 'project',
  //   loadChildren: './project/project.module#ProjectModule',
  //   pathMatch: 'full',
  // }
  {path: '', redirectTo: '/project', pathMatch: 'full'},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
