import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JustReduxComponent } from './just-redux/just-redux.component';
import { JustReduxRouting } from './just-redux.routing';


@NgModule({
  imports: [
      CommonModule,
      JustReduxRouting
      
  ],
  declarations: [
    JustReduxComponent
  ]
})
export class JustReduxModule { }
