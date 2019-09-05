import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import * as Rx from 'rxjs';
import { interval, fromEvent, timer, Subject, throwError, Subscriber, Subscription, BehaviorSubject, forkJoin, of, from, Observable } from 'rxjs';
import { map, combineLatest, merge } from 'rxjs/operators';

@Component({
  selector: 'app-age-input',
  templateUrl: './age-input.component.html',
  styleUrls: ['./age-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgeInputComponent implements ControlValueAccessor, OnInit, OnDestroy {

  form: FormGroup;
  ageUnits = [
    {value: '1985/02/11', label: '岁'},
    {value: '02', label: '月'},
    {value: '11', label: '天'}
  ];
  private propagateChange = (_: any) => {};
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      birthday: ['1985/02/11'],
      age:  this.fb.group({
        ageNum: [25],
        ageUnit: ['initAge.unit']
      })
    });
    const birthday = this.form.get('birthday');
    const ageNum = this.form.get('age').get('ageNum'); 
    const ageUnit = this.form.get('age').get('ageUnit'); 
    
    const birthday$ = birthday.valueChanges.pipe(
      map(d => { // 增加一个标识
        return {date: d, from: 'birthday'}
      })
    );
    const ageNum$ = ageNum.valueChanges;
    const ageUnit$ = ageUnit.valueChanges;
    const age$ = ageNum$.pipe(
      // 新版本rxjs，操作符必须用pipe，使用Rx.Observable不能直接使用操作符，可以使用interval
      combineLatest(ageUnit$, (_n, _u) => {
        return this.toDate({age: _n, unti: _u})
      }),
      map(d => { // 增加一个标识
        return {date: d, from: 'age'}
      })
    )
    // 合并上面birthday 和 age工作流
    // const merged$ = Rx.merge(birthday$, age$); 看看这种写法与正常操作符写法是否相同
    const merged$ = birthday$.pipe(merge(age$));
  }
  ngOnDestroy() {
    // if(this.subBirth) {
    //   this.subBirth.unsubscribe();
    // }
  }
  // 下面这三个是自定义表单控件必写的方法，继承自ControlValueAccessor
  // 提供值的写入方法
  public writeValue(obj: Date) {
    // if (obj) {
    //   const date = toDate(obj);
    //   this.form.get('birthday').patchValue(date, {emitEvent: true});
    // }
  }
  // 当表单控件值改变时，函数 fn 会被调用
  // 这也是我们把变化 emit 回表单的机制
  public registerOnChange(fn: any) {
    this.propagateChange = fn;
  }
  // 这里没有使用，用于注册 touched 状态
  public registerOnTouched() {
  }

  toDate({age, unti}) {

  }
}
