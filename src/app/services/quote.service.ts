import {Inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { debug } from '../utils/debug.util';
import { Quote } from '../domain';

@Injectable({
  providedIn: 'root',
})

export class QuoteService {
  // private uri: string = 'https://api.hzy.pw/saying/v1/ciba';
  constructor(@Inject('BASE_CONFIG') private config,
              private http: HttpClient) {
  }
  getQuote(): Observable<any> {
    const uri = `${this.config.uri}/quotes/${Math.floor(Math.random() * 10)}`;
    console.log(uri);
    return this.http.get(uri).pipe(
      debug('quote '), // 上面引入后，直接将方法使用在pipe里即可
      map(res => res) // res.json() 未好使
    )
  }
}
