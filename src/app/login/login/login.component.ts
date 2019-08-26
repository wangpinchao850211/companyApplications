import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Quote } from '../../domain/quote';
import { debug } from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  quote$: Quote = {
    id: '0',
    cn: "满足感在于不断的努力，而不是现有成就。全心努力定会胜利满满",
    en: "Satisfaction lies in constant effort, not in existing achievements. With all one's heart and soul, we will be full of success.",
    pic: "/assets/img/quote_fallback.jpg"
  };
  constructor(
    private http: HttpClient,
    @Inject('BASE_CONFIG') private config,
    private fb: FormBuilder
  ) {
    const uri = `${this.config.uri}/quotes/${Math.floor(Math.random() * 10)}`;
    const httpflow = this.http.get(uri).debug('quote: ');
    // httpflow.subscribe((q) => {
    //   console.log(q as Quote);
    //   this.quote$ = q as Quote;
    // });
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
    // this.store$.dispatch(
    //   new authActions.LoginAction({
    //     email: value.email,
    //     password: value.password
    //   }));

    // 自定义验证器也可以不在上面初始化时声明，可以在submit时动态设置使用,如下:
    this.form.controls['email'].setValidators(this.validator);
  }

  validator(c: FormControl): {[key: string]: any} { // 自定义验证器
    return null;
  }

}
