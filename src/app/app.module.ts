import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DragDropDirectiveModule} from "angular4-drag-drop";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent, DialogDataExampleDialog, PizzaPartyComponent } from './app.component';
import { MaterialModule } from './material.module';
import { CommonServService } from './common-serv.service';

@NgModule({
  declarations: [
    AppComponent, DialogDataExampleDialog, PizzaPartyComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule, FormsModule, ReactiveFormsModule,
    DragDropDirectiveModule
  ],
  providers: [CommonServService],
  bootstrap: [AppComponent],
  entryComponents: [DialogDataExampleDialog, PizzaPartyComponent]
})
export class AppModule { }
