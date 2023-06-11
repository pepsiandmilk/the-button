import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalComponent } from './modal/modal.component';
import { SettingsModalComponent } from './settings-modal/settings-modal.component';
import { CamelCaseToWordsPipe } from './camel-case-to-words.pipe';
import { TypeofPipe } from './typeof.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    SettingsModalComponent,
    CamelCaseToWordsPipe,
    TypeofPipe,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
