import {Observable} from 'rxjs';
import * as Rx from 'rxjs';
import {environment} from '../../environments/environment';

declare module 'rxjs' {
  interface Observable<Object> {
    debug: (...any) => Observable<Object>;
  }
}
var Observable = Rx.Observable;
describe('Observable.prototype.debug', function() {
  return this.tap(
    (next) => {
      if (!environment.production) {
        // console.log(message, next);
      }
    },
    (err) => {
      if (!environment.production) {
        // console.error('ERROR>>>', message, err);
      }
    },
    () => {
      if (!environment.production) {
        console.log('Completed - ');
      }
    }
  );
});
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
