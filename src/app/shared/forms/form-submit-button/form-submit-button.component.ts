import { Component, Input } from '@angular/core';

@Component({
  selector: 'form-submit-button',
  templateUrl: './form-submit-button.component.html',
  styleUrls: ['./form-submit-button.component.scss']
})
export class FormSubmitButtonComponent {
  @Input() sending: boolean;
  @Input() sendingText: string;
  @Input() error: boolean;
  @Input() errorText: string;
  constructor() { }
}
