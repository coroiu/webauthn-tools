import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import {
  WebAuthnChallengeResponse,
  WebAuthnCreateChallengeResponse,
  WebAuthnGetChallengeResponse,
} from '../../../types/webauthn-challenge-response';
import { FormsModule } from '@angular/forms';
import { OptionsComponent } from '../../../options/options.component';
import { CommonModule } from '@angular/common';
import { PrettyJsonComponent } from '../../../pretty-json/pretty-json.component';
import { JsonMetadata } from '../../../pretty-json/json-metadata';

@Component({
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.scss'],
  imports: [CommonModule, FormsModule, OptionsComponent, PrettyJsonComponent],
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
      const decoded = atob(data.target.value.replaceAll(' ', ''));
      const parsed = JSON.parse(decoded);
      console.log(parsed);
      this.data$.next(parsed);
    } catch {}
  }

  getMetadata(
    data: WebAuthnChallengeResponse
  ): JsonMetadata<WebAuthnChallengeResponse> {
    if (data.method === 'navigator.credentials.create') {
      return {
        method: {
          genericDescription: 'This is a method used to create a new passkey',
          fields: undefined,
        },
        options: {
          fields: {
            publicKey: {
              genericDescription: 'WebAuthn options object',
              fields: {} as any,
            },
          },
        },
      };
    }

    if (data.method === 'navigator.credentials.get') {
      return {
        method: {
          genericDescription: 'This is a method used to authenticate',
          fields: undefined,
        },
        options: {
          fields: {
            publicKey: {
              genericDescription: 'WebAuthn options object',
              fields: {} as any,
            },
          },
        },
      };
    } else {
      return {} as any;
    }
  }
}
