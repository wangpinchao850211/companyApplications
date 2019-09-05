import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import {
  subYears,
  subMonths,
  subDays,
  isBefore,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  parse,
  format,
  isDate,
  isValid,
  isFuture
} from 'date-fns';
import * as Rx from 'rxjs';
import { interval, fromEvent, timer, Subject, throwError, Subscriber, Subscription, BehaviorSubject, forkJoin, of, from, Observable } from 'rxjs';
import { map, combineLatest, merge, debounceTime, distinctUntilChanged, filter, startWith } from 'rxjs/operators';
import { toDate, isValidDate } from '../../utils/date.util';

export enum AgeUnit {
  Year = 0,
  Month,
  Day
}

export interface Age {
  age: number;
  unit: AgeUnit;
}

@Component({
  selector: 'app-age-input',
  templateUrl: './age-input.component.html',
  styleUrls: ['./age-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgeInputComponent implements ControlValueAccessor, OnInit, OnDestroy {

  selectedUnit = AgeUnit.Year;
  form: FormGroup;
  ageUnits = [
    {value: AgeUnit.Year, label: '岁'},
    {value: AgeUnit.Month, label: '月'},
    {value: AgeUnit.Day, label: '天'}
  ];
  dateOfBirth;
  @Input() daysTop = 90;
  @Input() daysBottom = 0;
  @Input() monthsTop = 24;
  @Input() monthsBottom = 1;
  @Input() yearsBottom = 1;
  @Input() yearsTop = 150;
  @Input() debounceTime = 300;
  private subBirth: Subscription;
  private propagateChange = (_: any) => {};
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    const initDate = this.dateOfBirth ? this.dateOfBirth : toDate(subYears(Date.now(), 30));
    const initAge = this.toAge(initDate);
    this.form = this.fb.group({
      birthday: [initDate, this.validateDate],
      age:  this.fb.group({
        ageNum: [initAge.age],
        ageUnit: [initAge.unit]
      }, {validator: this.validateAge('ageNum', 'ageUnit')})
    });
    const birthday = this.form.get('birthday');
    const ageNum = this.form.get('age').get('ageNum'); 
    const ageUnit = this.form.get('age').get('ageUnit'); 
    
    const birthday$ = birthday.valueChanges.pipe(
      map(d => { // 增加一个标识
        return {date: d, from: 'birthday'}
      }),
      debounceTime(this.debounceTime),
      distinctUntilChanged(),
      filter(date => birthday.valid)
    );
    const ageNum$ = ageNum.valueChanges.pipe(
      startWith(ageNum.value),
      debounceTime(this.debounceTime),
      distinctUntilChanged()
    );
    const ageUnit$ = ageUnit.valueChanges.pipe(
      startWith(ageNum.value),
      debounceTime(this.debounceTime),
      distinctUntilChanged()
    );
    const age$ = ageNum$.pipe(
      // 新版本rxjs，操作符必须用pipe，使用Rx.Observable不能直接使用操作符，可以使用interval
      combineLatest(ageUnit$, (_n, _u) => {
        return this.toDate({age: _n, unit: _u})
      }),
      map(d => { // 增加一个标识
        return {date: d, from: 'age'}
      }),
      filter(_ => this.form.get('age').valid)
    )
    // 合并上面birthday 和 age工作流
    // const merged$ = Rx.merge(birthday$, age$); 看看这种写法与正常操作符写法是否相同
    const merged$ = birthday$.pipe(
      merge(age$),
      filter(_ => this.form.valid)
    );
    this.subBirth = merged$.subscribe(date => {
      const age = this.toAge(date.date);
      if (date.from === 'birthday') {
        if(age.age === ageNum.value && age.unit === ageUnit.value) {
          return;
        }
        ageUnit.patchValue(age.unit, {emitEvent: false});
        ageNum.patchValue(age.age, {emitEvent: false});
        this.selectedUnit = age.unit;
        this.propagateChange(date.date);
      } else {
        const ageToCompare = this.toAge(this.form.get('birthday').value);
        if(age.age !== ageToCompare.age || age.unit !== ageToCompare.unit) {
          this.form.get('birthday').patchValue(date.date, {emitEvent: false});
          this.propagateChange(date.date);
        }
      }
    })
  }
  ngOnDestroy() {
    if(this.subBirth) {
      this.subBirth.unsubscribe();
    }
  }

  // 验证表单，验证结果正确返回 null 否则返回一个验证结果对象
  validate(c: FormControl): {[key: string]: any} {
    const val = c.value;
    if (!val) {
      return null;
    }
    if (isValidDate(val)) {
      return null;
    }
    return {
      dateOfBirthInvalid: true
    };
  }

  validateDate(c: FormControl): {[key: string]: any} {
    const val = c.value;
    return isValidDate(val) ? null : {
      birthdayInvalid: true
    }
  }

  validateAge(ageNumKey: string, ageUnitKey:string) {
    return (group: FormGroup): {[key: string]: any} => {
      const ageNum = group.controls[ageNumKey];
      const ageUnit = group.controls[ageUnitKey];
      let result = false;
      const ageNumVal = ageNum.value;

      switch (ageUnit.value) {
        case AgeUnit.Year: {
          result = ageNumVal >= this.yearsBottom && ageNumVal <= this.yearsTop
          break;
        }
        case AgeUnit.Month: {
          result = ageNumVal >= this.monthsBottom && ageNumVal <= this.monthsTop
          break;
        }
        case AgeUnit.Day: {
          result = ageNumVal >= this.daysBottom && ageNumVal <= this.daysTop
          break;
        }
        default: {
          result = false;
          break;
        }
      }
      return result ? null : {
        ageInvalid: true
      };
    };
  }

  // 下面这三个是自定义表单控件必写的方法，继承自ControlValueAccessor
  // 提供值的写入方法
  public writeValue(obj: Date) {
    if (obj) {
      const date = toDate(obj);
      this.form.get('birthday').patchValue(date, {emitEvent: true});
      const age = this.toAge(date);
      this.form.get('age').get('ageNum').patchValue(age.age);
      this.form.get('age').get('ageUnit').patchValue(age.unit);
    }
  }
  // 当表单控件值改变时，函数 fn 会被调用
  // 这也是我们把变化 emit 回表单的机制
  public registerOnChange(fn: any) {
    this.propagateChange = fn;
  }
  // 这里没有使用，用于注册 touched 状态
  public registerOnTouched() {
  }
  private toAge(dateStr: string): Age {
    const date = parse(dateStr);
    const now = new Date();
    if (isBefore(subDays(now, this.daysTop), date)) {
      return {
        age: differenceInDays(now, date),
        unit: AgeUnit.Day
      };
    } else if (isBefore(subMonths(now, this.monthsTop), date)) {
      return {
        age: differenceInMonths(now, date),
        unit: AgeUnit.Month
      };
    } else {
      return {
        age: differenceInYears(now, date),
        unit: AgeUnit.Year
      };
    }
  }

  private toDate(age: Age): string {
    const now = new Date();
    switch (age.unit) {
      case AgeUnit.Year: {
        return toDate(subYears(now, age.age));
      }
      case AgeUnit.Month: {
        return toDate(subMonths(now, age.age));
      }
      case AgeUnit.Day: {
        return toDate(subDays(now, age.age));
      }
      default: break;
    }
  }
}
