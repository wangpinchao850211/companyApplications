import {Observable} from 'rxjs';
// import * as Rx from 'rxjs';
import {tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';

declare module 'rxjs' {
  interface Observable<T> {
    debug: (...any) => Observable<T>;
  }
}
// 现在rxjs自定义操作符，是直接定义方法，直接引入即可在pipe里使用，并不是在Observable.prototype上加，否则会增大Observable对象的方法
export const debug = (message: string) => <T>(source: Observable<T>) =>
  source.pipe(
    tap(
      (next) => {
        if (!environment.production) {
          console.log(message, next);
        }
      },
      (err) => {
        if (!environment.production) {
          console.error('ERROR>>>', message, err);
        }
      },
      () => {
        if (!environment.production) {
          console.log('Completed - ');
        }
      }
    )
  )
// var Observable = Rx.Observable;
// describe('Observable.prototype.debug', function() {
//   return this.tap(
//     (next) => {
//       if (!environment.production) {
//         // console.log(message, next);
//       }
//     },
//     (err) => {
//       if (!environment.production) {
//         // console.error('ERROR>>>', message, err);
//       }
//     },
//     () => {
//       if (!environment.production) {
//         console.log('Completed - ');
//       }
//     }
//   );
// });
// Observable.prototype.debug = function(message: string) {
//   return this.tap(
//     (next) => {
//       if (!environment.production) {
//         console.log(message, next);
//       }
//     },
//     (err) => {
//       if (!environment.production) {
//         console.error('ERROR>>>', message, err);
//       }
//     },
//     () => {
//       if (!environment.production) {
//         console.log('Completed - ');
//       }
//     }
//   );
// };
