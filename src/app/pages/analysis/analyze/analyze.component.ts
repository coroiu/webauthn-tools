import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { WebAuthnChallengeResponse } from '../../../types/webauthn-challenge-response';
import { FormsModule } from '@angular/forms';
import { OptionsComponent } from '../../../options/options.component';
import { CommonModule } from '@angular/common';

@Component({
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.scss'],
  imports: [CommonModule, FormsModule, OptionsComponent],
  standalone: true,
})
export class AnalyzeComponent {
  protected data$ = new Subject<WebAuthnChallengeResponse>();

  readData(data: Event) {
    if (
      !data.target ||
      !('value' in data.target) ||
      typeof data.target.value !== 'string'
    ) {
      return;
    }

    try {
      const decoded = atob(data.target.value);
      const parsed = JSON.parse(decoded);
      console.log(parsed);
      this.data$.next(parsed);
    } catch {}
  }
}
