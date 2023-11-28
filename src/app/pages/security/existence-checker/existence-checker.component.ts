import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { getCoroiu } from '../../../types/window-coroiu';
import { CommonModule } from '@angular/common';

@Component({
  templateUrl: './existence-checker.component.html',
  styleUrls: ['./existence-checker.component.scss'],
  imports: [CommonModule, MatCardModule, MatButtonModule],
  standalone: true,
})
export class ExistenceCheckerComponent implements OnInit {
  protected passkeyProviderDetected = false;
  protected credentialDetected = false;

  ngOnInit(): void {
    this.passkeyProviderDetected = this.checkPasskeyProvider();
  }

  protected async checkCredentials(): Promise<void> {}

  protected createCredential() {
    window.navigator.credentials.create({
      publicKey: {
        rp: {
          name: 'Coroiu',
        },
        user: {
          id: new Uint8Array([1, 2, 3, 4, 5]),
          name: 'Existence checker user',
          displayName: 'Existence checker user',
        },
        authenticatorSelection: {},
        challenge: new Uint8Array([1, 2, 3, 4, 5]),
        pubKeyCredParams: [
          {
            type: 'public-key',
            alg: -7,
          },
        ],
        timeout: 60000,
      },
    });
  }

  private checkPasskeyProvider(): boolean {
    return window.navigator.credentials.get !== getCoroiu().webauthn.native.get;
  }
}
