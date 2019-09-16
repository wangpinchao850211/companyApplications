import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NgrxBaseComponent} from './ngrx-base/ngrx-base.component';


const routes: Routes = [
  {
    path: 'ngrx',
    component: NgrxBaseComponent,
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NgrxRoutingModule {
}
