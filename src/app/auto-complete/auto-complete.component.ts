import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-auto-complete',
  template: `
    <div class="flex flex-column">

      <input type="text" [ngModel]="name" (keyup)="onKey($event)">

      <div class="flex flex-column suggestionContainer" *ngIf="suggestions.length > 0">
        <li class="suggestion" *ngFor="let suggestion of suggestions" (click)="applySuggestion(suggestion)">{{suggestion}}</li>
      </div>
    </div>
  `,
  styles: [`
    .flex {display:flex;}
    .flex-row {flex-direction: row;}
    .flex-column {flex-direction: column;}

    .suggestionContainer {
      -webkit-box-shadow: -4px 19px 47px 12px rgba(161,161,161,0.85);
      -moz-box-shadow: -4px 19px 47px 12px rgba(161,161,161,0.85);
      box-shadow: -4px 19px 47px 12px rgba(161,161,161,0.85);
      border-radius: 2px;
    }

    .suggestion {
      list-style:none;
      padding: 5px;
      border-bottom: 1px solid #F0F0F0;
      font-family: 'Helvetica Neue';
    }

    .suggestion:hover {
      background: #F0F0F0;
      cursor: pointer;
    }
  `
  ],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AutoCompleteComponent implements OnInit {
  @Input() name: string;
  @Input() values: string;
  @Output() nameChange = new EventEmitter();

  @Input() suggestionValues: Array<string>;
  suggestions: Array<string>;

  constructor() { }

  ngOnInit(): void {
    this.suggestions = new Array<string>();

    if (!this.values && !this.suggestionValues) {
      this.suggestionValues = new Array<string>('Bregenz', 'Innsbruck', 'Salzbug', 'Linz', 'St. Pölten', 'Wien', 'Klagenfurt', 'Graz', 'Eisenstadt');
    } else if (this.values) {
      if (this.values) {
        const temp = this.values.split(',');
        this.suggestionValues = new Array<string>(...temp);
      }
    } else {
      this.suggestionValues = new Array<string>();
    }
  }

  onKey(event: any) {
    const searchTerm: string = event.target.value;
    this.suggestions = this.suggestionValues
      .filter(t => t.toLowerCase().includes(searchTerm.toLowerCase())).sort((a, b) => a.localeCompare(b));
  }

  applySuggestion(value: string) {
    this.name = value;
    this.nameChange.emit(value);

    // reset the suggestions
    this.suggestions = new Array<string>();
  }
}
