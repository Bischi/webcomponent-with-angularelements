import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AutoCompleteComponent } from './auto-complete/auto-complete.component';
import { FormsModule } from '@angular/forms';

import { createCustomElement } from '@angular/elements';


@NgModule({
  declarations: [
    AutoCompleteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [AutoCompleteComponent]

})
export class AppModule {
  constructor(private injector: Injector) { }

  ngDoBootstrap() {
    const element = createCustomElement(AutoCompleteComponent, { injector: this.injector });
    customElements.define('auto-complete', element);
  }
}
