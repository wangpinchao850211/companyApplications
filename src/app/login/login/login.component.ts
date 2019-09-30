import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Quote } from '../../domain/quote';
import * as fromRoot from '../../reducers';
import { debug } from 'util';
import { QuoteService } from '../../services/quote.service';
import { Store, select } from '@ngrx/store';
import * as actions from '../../actions/quote.action';
import * as authActions from '../../actions/auth.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ QuoteService ],
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  public quote = {};
  constructor(
    private store$: Store<fromRoot.State>,
    private router: Router,
    private quoteService: QuoteService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef, // 变更检测
  ) {
    this.store$.pipe(select('quote')).subscribe(data => {
      console.log(data);
      this.quote = { ...data.quote };
    });
    // 触发获取quote的action，使用effect进行action分流！(ajax请求，获取每日佳句，在effect种)
      this.store$.dispatch({type: actions.ActionTypes.QUOTE});
  }

  ngOnInit() {
    this.form = this.fb.group({
      // Validators.compose() 指定多个验证器
      email: ['fan@163.com', Validators.compose([Validators.required, Validators.email])],
      password: ['wpc123456', Validators.required]
    });

  }
  // 使用解构赋值获取到form的value和valid
  onSubmit({value, valid}, e: Event) {
    console.log(value);
    console.log(valid);
    e.preventDefault();
    if (!valid) {
      return;
    }
    // 登陆获取权限
    this.store$.dispatch(
      {
        type: authActions.ActionTypes.LOGIN_SUCCESS,
        payload: {
          val: {
            email: value.email,
            password: value.password
          }
        }
      });

    // 自定义验证器也可以不在上面初始化时声明，可以在submit时动态设置使用,如下:
    this.form.controls['email'].setValidators(this.validator);
    this.router.navigate(['project']);

  }

  validator(c: FormControl): {[key: string]: any} { // 自定义验证器
    return null;
  }

}
