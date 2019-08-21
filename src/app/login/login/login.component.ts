import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  constructor(
    private fb: FormBuilder
  ) { }

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
