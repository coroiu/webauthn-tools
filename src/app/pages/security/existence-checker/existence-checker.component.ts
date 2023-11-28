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
  protected credentialDetected: boolean | null = null;

  ngOnInit(): void {
    this.passkeyProviderDetected = this.checkPasskeyProvider();
    this.checkCredentials();
  }

  protected async checkCredentials(): Promise<void> {
    let nativeCalled = false;

    (getCoroiu().webauthn.interceptors.get as any) = async (
      options: CredentialRequestOptions
    ) => {
      nativeCalled = true;
      // TypeScript doesn't know about abortController, because it's wrongly implemented in Bitwarden
      const get = (getCoroiu().webauthn.native.get as any).bind(
        getCoroiu().webauthn.native.credentialsContainer
      );
      return await get(options);
    };

    const abortController = new AbortController();
    try {
      (window.navigator.credentials.get as any)(
        {
          publicKey: {
            challenge: new Uint8Array([1, 2, 3, 4, 5]),
          },
          signal: abortController.signal,
        },
        abortController
      );
    } catch {}

    setTimeout(() => {
      this.credentialDetected = !nativeCalled;
      abortController.abort();

      (getCoroiu().webauthn.interceptors.get as any) = undefined;
    }, 500);
  }

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
        authenticatorSelection: {
          residentKey: 'required',
        },
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
