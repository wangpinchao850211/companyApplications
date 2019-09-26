import { NgModule } from '@angular/core';
import { Actions, createEffect, EffectsModule } from '@ngrx/effects';
import { QuoteEffects } from './effects/quote.effects';

// 这个文件没合并成effect，需再考虑
@NgModule({
  imports: [
    EffectsModule.forRoot([QuoteEffects]),
  ],
})

export class AppEffects {
  // constructor(private actions$: Actions) {}
}
