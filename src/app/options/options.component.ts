import { Component, Input } from '@angular/core';
import { WebAuthnOptions } from '../types/webauthn-challenge-response';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  standalone: true,
})
export class OptionsComponent {
  @Input({ required: true }) options!: WebAuthnOptions;
}
