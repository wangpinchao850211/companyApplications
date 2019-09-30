import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
// import {ROUTER_REQUEST} from '@ngrx/router-store/request'; store/route 没使用成研究！！
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import {AuthService} from '../services';
import * as actions from '../actions/auth.action';
import * as fromRoot from '../reducers';
import {Auth} from '../domain';

@Injectable()
export class AuthEffects {

  /**
   *
   */
  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.LOGIN),
    // switchMap((type: { email: string, password: string }) => this.authService
    //   .login(type.email, type.password).pipe(
    //     map(auth => {
    //       console.log(auth);
    //       // 把token存储到store里
    //       this.store$.dispatch({type: actions.ActionTypes.LOGIN_SUCCESS, payload: auth});
    //       }),
    //       catchError((err) => of(new actions.LoginFailAction({
    //         status: 501,
    //         message: err.message,
    //         exception: err.stack,
    //         path: '/login',
    //         timestamp: new Date()
    //       })))
    //   )
    // ),
  );
  /**
   *
   */
  // @Effect()
  // register$: Observable<Action> = this.actions$.pipe(
  //   ofType(actions.ActionTypes.REGISTER),
  //   switchMap((val) => this.authService
  //     .register(val).pipe(
  //       map(auth => new actions.RegisterSuccessAction(auth)),
  //       catchError(err => of(new actions.RegisterFailAction(err)))
  //     )
  //   )
  // );

  // @Effect()
  // navigateHome$: Observable<Action> = this.actions$.pipe(
  //   ofType(actions.ActionTypes.LOGIN_SUCCESS),
  //   map(() => go(['/projects']))
  // );

  // @Effect()
  // registerAndHome$: Observable<Action> = this.actions$.pipe(
  //   ofType(actions.ActionTypes.REGISTER_SUCCESS),
  //   map(() => go(['/projects']))
  // );

  // @Effect()
  // logout$: Observable<Action> = this.actions$.pipe(
  //   ofType(actions.ActionTypes.LOGOUT),
  //   map(() => go(['/']))
  // );
  /**
   *
   * @param actions$
   * @param authService
   */
  constructor(
    private store$: Store<fromRoot.State>,
    private actions$: Actions,
    private authService: AuthService) {}
}
