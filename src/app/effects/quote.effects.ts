import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { QuoteService } from '../services/quote.service';
import * as actions from '../actions/quote.action';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
 
@Injectable()
export class QuoteEffects {
 
  quote$ = createEffect(() => this.actions$.pipe(
      ofType(actions.ActionTypes.QUOTE),
      mergeMap(() => this.quoteService.getQuote().pipe(
          map(q => {
            // 在effect中触发相应的action
            this.store$.dispatch({type: actions.ActionTypes.QUOTE_SUCCESS, payload: q});
          }),
          catchError((err) => of(new actions.QuoteFailAction(JSON.stringify(err))))
      ))
  ), { dispatch: false });
 
  constructor(
    private store$: Store<fromRoot.State>,
    private actions$: Actions,
    private quoteService: QuoteService
  ) {}
}