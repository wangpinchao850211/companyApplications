import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDirective } from './drag-drop/drag.directive';
import { DropDirective } from './drag-drop/drop.directive';
import { DragDropService, DragData } from './drag-drop.service';

@NgModule({
  providers: [
    DragDropService
  ],
  declarations: [
    DragDirective, 
    DropDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DragDirective, 
    DropDirective
  ]
})
export class DirectivesModule { }
export {DragData};
