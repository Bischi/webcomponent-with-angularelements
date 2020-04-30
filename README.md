# AutoCompleteWebComponent
Martin Bischof

## Angular Elements
Angular Elements bietet die Möglichkeit aus einer Angular-Component eine Web Component zu erstellen, die auch außerhalb der Angular-Umgebung verwendet werden kann. Der große Vorteil dabei ist, dass die Component wie eine ganz gewöhnliche Angular-Component entwickelt werden kann.

Eine ausführlichere Beschreibung -> [AngularElements](https://angular.io/guide/elements)

Installation: `npm i @angular/elements --save`


## AutoComplete Component
Die Auto-Complete-Component ist die Angular Componente, die zu einer Web Componente wird. Dafür muss in `app.module.ts` folgendes definiert werden: 

    @NgModule({
      ...
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

 `const element = createCustomElement(AutoCompleteComponent, { injector: this.injector });` bewirkt die Umwandlung von einer Angular Component in eine Web Component. Sie kann dann wie eine gewöhnliche Web Component im Browser registriert werden: `customElements.define('auto-complete', element);`.

Wichtig ist, dass keine Komponente als Bootstrap (also für das Hochfahren der App) angegeben wird! 


