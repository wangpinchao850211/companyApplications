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
      if (isValidAddr(info.addrCode)) {
        const addr = getAddrByCode(info.addrCode);
        this.form.patchValue({address: addr});
        this.form.updateValueAndValidity({onlySelf: true, emitEvent: true});
      }
      if (isValidDate(info.dateOfBirth)) {
        const date = info.dateOfBirth;
        this.form.patchValue({dateOfBirth: date});
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
