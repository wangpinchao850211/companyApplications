import { Component, OnInit, ChangeDetectionStrategy, forwardRef, OnDestroy } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, FormControl } from '@angular/forms';
import { Subject, Observable, Subscription, merge } from 'rxjs';
import { combineLatest } from 'rxjs/operators';
import {Identity, IdentityType} from '../../domain';
import {isValidAddr, extractInfo} from '../../utils/identity.util';
import {isValidDate} from '../../utils/date.util';

@Component({
  selector: 'app-indentity-input',
  templateUrl: './indentity-input.component.html',
  styleUrls: ['./indentity-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IndentityInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => IndentityInputComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndentityInputComponent implements ControlValueAccessor, OnInit, OnDestroy {

  identityTypes: {value: IdentityType, label: string}[] = [
    {value: IdentityType.IdCard, label: '身份证'},
    {value: IdentityType.Insurance, label: '医保'},
    {value: IdentityType.Passport, label: '护照'},
    {value: IdentityType.Military, label: '军官证'},
    {value: IdentityType.Other, label: '其它'}
  ];
  identity: Identity = {identityType: null, identityNo: null};
  private _idType = new Subject<IdentityType>();
  private _idNo = new Subject<string>();
  private _sub: Subscription;
  constructor() { }

  private propagateChange = (_: any) => {};
  ngOnInit() {
    const valu$ = this.idNo.pipe(
      combineLatest(this.idType, (_no, _type) => {
        return {
          identityType: _type,
          identityNo: _no
        };
      })
    )
    this._sub = valu$.subscribe(v => {
      this.identity = v;
      this.propagateChange(v);
    });
  }

  ngOnDestroy() {
    if (this._sub) {
      this._sub.unsubscribe();
    }
  }

  // 设置初始值
  public writeValue(obj: Identity): void {
    if (obj) {
      this.identity = obj;
    }
  }
  // 当表单控件值改变时，函数 fn 会被调用
  // 这也是我们把变化 emit 回表单的机制
  public registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  // 这里没有使用，用于注册 touched 状态
  public registerOnTouched() {
  }

  validate(c: FormControl): {[key:string]: any} {
    const val = c.value;
    if (!val) return null;
    switch (c.value.identityType) {
      case IdentityType.IdCard: {
        return this.validateIdNumber(c);
      }
      case IdentityType.Passport: {
        return this.validatePassport(c);
      }
      case IdentityType.Military: {
        return this.validateMilitary(c);
      }
      case IdentityType.Insurance:
      default: {
        return null;
      }
    }
  }

  private validateIdNumber(c: FormControl): {[key: string]: any} {
    const val = c.value.identityNo;
    if (val.length !== 18) {
      return {
        idNotValid:  true
      };
    }
    const pattern = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}[x0-9]$/;
    let result = false;
    if (pattern.test(val)) {
      const info = extractInfo(val);
      if (isValidAddr(info.addrCode) && isValidDate(info.dateOfBirth)) {
        result = true;
      }
    }
    return result ? null : {idNotValid:  true};
  }

  private validatePassport(c: FormControl): {[key: string]: any} {
    const value = c.value.identityNo;
    if (value.length !== 9) {
      return {idNotValid: true};
    }
    const pattern = /^[GgEe]\d{8}$/;
    let result = false;
    if (pattern.test(value)) {
      result = true;
    }
    return result ? null : {idNotValid:  true};
  }

  private validateMilitary(c: FormControl): {[key: string]: any} {
    const value = c.value.identityNo;
    const pattern = /[\u4e00-\u9fa5](字第)(\d{4,8})(号?)$/;
    let result = false;
    if (pattern.test(value)) {
      result = true;
    }
    return result ? null : {idNotValid:  true};
  }

  onIdTypeChange(idType: IdentityType) {
    this._idType.next(idType);
  }

  onIdNoChange(idNo: string) {
    this._idNo.next(idNo);
  }

  private get idType(): Observable<IdentityType> {
    return this._idType.asObservable();
  }

  private get idNo(): Observable<string> {
    return this._idNo.asObservable();
  }



}
