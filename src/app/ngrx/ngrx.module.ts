import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgrxBaseComponent } from './ngrx-base/ngrx-base.component';
import { NgrxRoutingModule } from './ngrx-routing-module'

@NgModule({
  declarations: [NgrxBaseComponent],
  imports: [
    CommonModule,
    NgrxRoutingModule
  ]
})
export class NgrxModule { }
