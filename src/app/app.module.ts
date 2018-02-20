import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent, DialogDataExampleDialog } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent, DialogDataExampleDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule, FormsModule, ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DialogDataExampleDialog]
})
export class AppModule { }
