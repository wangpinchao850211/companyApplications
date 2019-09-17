import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { NgrxBaseComponent } from './ngrx-base/ngrx-base.component';
import { NgrxRoutingModule } from './ngrx-routing-module'

@NgModule({
  declarations: [NgrxBaseComponent],
  imports: [
    SharedModule,
    NgrxRoutingModule
  ]
})
export class NgrxModule { }
