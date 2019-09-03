import {Inject, Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs';
import {Quote} from '../domain';

@Injectable()
export class QuoteService {
  // private uri: string = 'https://api.hzy.pw/saying/v1/ciba';
  constructor(@Inject('BASE_CONFIG') private config,
              private http: Http) {
  }

  getQuote(): Observable<Response> {
    const uri = `${this.config.uri}/quotes/${Math.floor(Math.random() * 10)}`;
    return this.http.get(uri)
      // .debug('quote ')
      // .map(res => res.json());
  }
}
