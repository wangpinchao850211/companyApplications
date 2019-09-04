import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';

@Component({
  selector: 'app-age-input',
  templateUrl: './age-input.component.html',
  styleUrls: ['./age-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgeInputComponent implements OnInit {

  form: FormGroup;
  ageUnits = [
    {value: '1985/02/11', label: '岁'},
    {value: '02', label: '月'},
    {value: '11', label: '天'}
  ];
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      birthday: ['1985/02/11'],
      age:  this.fb.group({
        ageNum: [25],
        ageUnit: ['initAge.unit']
      })
    });
  }

}
