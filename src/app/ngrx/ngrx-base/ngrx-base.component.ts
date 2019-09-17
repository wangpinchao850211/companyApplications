import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { increment, decrement, reset } from '../action/counter.actions';

@Component({
  selector: 'app-ngrx-base',
  templateUrl: './ngrx-base.component.html',
  styleUrls: ['./ngrx-base.component.scss']
})
export class NgrxBaseComponent implements OnInit {

  count$: Observable<number>;
  constructor(
    private store: Store<{ count: number }>
  ) { 
    this.count$ = store.pipe(select('count'))
  }

  ngOnInit() {
    this.count$.subscribe((count) => {
      console.log(count);
    });
  }

  increment() {
    this.store.dispatch(increment());
  }
 
  decrement() {
    this.store.dispatch(decrement());
  }
 
  reset() {
    this.store.dispatch(reset());
  }

}
