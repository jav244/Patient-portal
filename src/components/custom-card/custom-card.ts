import { Component } from '@angular/core';

/**
 * Generated class for the CustomCardComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'custom-card',
  templateUrl: 'custom-card.html'
})
export class CustomCardComponent {

  text: string;

  constructor() {
    console.log('Hello CustomCardComponent Component');
    this.text = 'Hello World';
  }

}
