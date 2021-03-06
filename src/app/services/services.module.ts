import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {QuoteService} from './quote.service';
export {
  QuoteService,
}
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ServicesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServicesModule,
      providers: [QuoteService]
    }
  }
}
