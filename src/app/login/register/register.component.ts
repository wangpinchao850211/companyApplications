import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map, combineLatest, merge, debounceTime, distinctUntilChanged, filter, startWith } from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {extractInfo, getAddrByCode, isValidAddr} from '../../utils/identity.util';
import {isValidDate, toDate} from '../../utils/date.util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  items: string[];
  form: FormGroup;
  private _sub: Subscription;
  private readonly avatarName = 'avatars';
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    const nums = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
    this.items = nums.map(d => `avatars:svg-${d}`);
    console.log(this.items);

    // 随机抽取img svg的名字
    const img = `${this.avatarName}:svg-${Math.floor(Math.random()*16).toFixed(0)}`;
    this.form = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(20)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.maxLength(20)])],
      repeat: ['', Validators.required],
      avatar: [img],
      dateOfBirth: ['1990-01-01'],
      address: ['', Validators.maxLength(80)],
      identity: []
    });
    // 将身份证信息转换成时间日期
    const id$ = this.form.get('identity').valueChanges.pipe(
      debounceTime(300),
      filter(_ => this.form.get('identity').valid)
    );

    this._sub = id$.subscribe(id => {
      const info = extractInfo(id.identityNo);
      if (isValidAddr(info.addrCode)) { // 更新地址
        const addr = getAddrByCode(info.addrCode); // 前六位转成地址
        this.form.patchValue({address: addr});
        // onlySelf只影响当前组件，不影响父组件
        // emitEvent：如果为 true 或未提供（默认），则当控件值发生变化时，statusChanges 和 valueChanges 这两个 Observable 分别会以最近的状态和值发出事件。 如果为 false 则不发出事件。 该配置项会被传给 updateValueAndValidity 方法。
        this.form.updateValueAndValidity({onlySelf: true, emitEvent: true});
      }
      if (isValidDate(info.dateOfBirth)) { // 更新年龄，出生日期
        const date = info.dateOfBirth;
        this.form.patchValue({dateOfBirth: date});
        // updateValueAndValidity重新计算控件的值和校验状态。
        this.form.updateValueAndValidity({onlySelf: true, emitEvent: true});
      }
    });
  }
  onSubmit({value, valid}, e: Event) {
    e.preventDefault();
    if (!valid) {
      return;
    }
    console.log(value);
  }

}
