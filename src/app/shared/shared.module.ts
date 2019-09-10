import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DirectivesModule } from '../directives/directives.module';
// material module
import {
  MatToolbarModule,
  MatSidenavModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatRadioModule,
  MatSelectModule,
  MatTabsModule,
  MatTooltipModule,
  MatSlideToggleModule,
} from '@angular/material';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ImageListSelectComponent } from './image-list-select/image-list-select.component';
import { AgeInputComponent } from './age-input/age-input.component';
import { ChipsListComponent } from './chips-list/chips-list.component';

const materialArr = [
  // 组件常用Module
  DirectivesModule,
  ReactiveFormsModule,
  FormsModule,
  // ImageListSelectComponent, // 导出自定义表单控件组件
  // material Module
  MatToolbarModule,
  MatSidenavModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatRadioModule,
  MatSelectModule,
  MatTabsModule,
  MatTooltipModule,
  MatSlideToggleModule,
]

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    ImageListSelectComponent,
    AgeInputComponent,
    ChipsListComponent]
  ,
  imports: [
    CommonModule,
    ...materialArr
  ],
  exports: [
    CommonModule,
    ImageListSelectComponent,
    AgeInputComponent, // 需要导出一下，方可使用
    ...materialArr
  ],
  entryComponents: [
    ConfirmDialogComponent,
  ]
})
export class SharedModule {
  constructor () {
  }
}
