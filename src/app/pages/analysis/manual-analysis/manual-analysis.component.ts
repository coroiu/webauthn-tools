import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import {
  DecodedAttestationObject,
  DecodedAttestedCredentialData,
  DecodedAuthenticatorData,
  DecodedWebAuthnChallengeResponse,
  WebAuthnChallengeResponse,
} from '../../../types/webauthn-challenge-response';
import { OptionsComponent } from '../../../options/options.component';
import { PrettyJsonComponent } from '../../../pretty-json/pretty-json.component';
import { JsonMetadata } from '../../../pretty-json/json-metadata';
import {
  attestationObjectExample,
  attestedCredentialDataExample,
  authenticatorDataExample,
} from './example.data';
import { decodeAttestationObject } from '../analyze/decode-create';
import {
  BufferReader,
  decodeAttestedCredentialData,
  decodeAuthenticatorData,
  decodeBase64Url,
} from '../analyze/decode-common';

@Component({
  templateUrl: './manual-analysis.component.html',
  styleUrls: ['./manual-analysis.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatExpansionModule,
    MatInputModule,
    MatCardModule,
    OptionsComponent,
    PrettyJsonComponent,
  ],
  standalone: true,
})
export class ManualAnalysisComponent implements OnInit, OnDestroy {
  private activatedRoute = inject(ActivatedRoute);
  private onDestroy$ = new Subject<void>();

  protected attestationObjectData$ = new ReplaySubject<{
    raw: Uint8Array;
    decoded: DecodedAttestationObject | undefined;
  }>(1);

  protected authenticatorData$ = new ReplaySubject<{
    raw: Uint8Array;
    decoded: DecodedAuthenticatorData | undefined;
  }>(1);

  protected attestedCredentialData$ = new ReplaySubject<{
    raw: Uint8Array;
    decoded: DecodedAttestedCredentialData | undefined;
  }>(1);

  ngOnInit(): void {
    // this.attestationObjectData$
    //   .pipe(takeUntil(this.onDestroy$))
    //   .subscribe(() => {
    //     // this.panelExpanded = false;
    //   });

    this.activatedRoute.queryParams
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((params) => {
        if ('example' in params) {
          {
            // Attestation object
            const raw = read(attestationObjectExample);
            const decoded = decodeAttestationObjectData(raw);
            this.attestationObjectData$.next({ raw, decoded });
          }

          {
            // Authenticator data
            const raw = read(authenticatorDataExample);
            const decoded = decodeAuthenticatorDataData(raw);
            this.authenticatorData$.next({ raw, decoded });
          }

          {
            // Attested credential data
            const raw = read(attestedCredentialDataExample);
            const decoded = decodeAttestedCredentialDataData(raw);
            this.attestedCredentialData$.next({ raw, decoded });
          }
        }
      });
  }

  readAttestationObject(data: Event) {
    if (
      !data.target ||
      !('value' in data.target) ||
      typeof data.target.value !== 'string'
    ) {
      return;
    }
    try {
      const raw = read(data.target.value.replaceAll(' ', ''));
      const decoded = decodeAttestationObjectData(raw);
      this.attestationObjectData$.next({ raw, decoded });
    } catch {}
  }

  readAuthenticatorData(data: Event) {
    if (
      !data.target ||
      !('value' in data.target) ||
      typeof data.target.value !== 'string'
    ) {
      return;
    }
    try {
      const raw = read(data.target.value.replaceAll(' ', ''));
      const decoded = decodeAuthenticatorData(raw);
      this.authenticatorData$.next({ raw, decoded });
    } catch {}
  }

  readAttestedCredentialData(data: Event) {
    if (
      !data.target ||
      !('value' in data.target) ||
      typeof data.target.value !== 'string'
    ) {
      return;
    }
    try {
      const raw = read(data.target.value.replaceAll(' ', ''));
      const decoded = decodeAttestedCredentialDataData(raw);
      this.attestedCredentialData$.next({ raw, decoded });
    } catch {}
  }

  getMetadata(
    data: DecodedWebAuthnChallengeResponse
  ): JsonMetadata<DecodedWebAuthnChallengeResponse> {
    throw new Error('Method not implemented.');
    // if (data.method === 'navigator.credentials.create') {
    //   return WebAuthnCreateMetadata;
    // }
    // if (data.method === 'navigator.credentials.get') {
    //   return {
    //     method: {
    //       genericDescription: 'This is a method used to authenticate',
    //       fields: undefined,
    //     },
    //     options: {
    //       fields: {
    //         publicKey: {
    //           genericDescription: 'WebAuthn options object',
    //           fields: {} as any,
    //         },
    //       },
    //     },
    //   } as any; // not implemented yet
    // } else {
    //   return {} as any;
    // }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}

function read(input: string): Uint8Array {
  if (isHex(input)) {
    return decodeHex(input);
  }

  return decodeBase64Url(input);
}

function isHex(input: string): boolean {
  return /^[0-9a-fA-F]*$/.test(input);
}

function decodeHex(input: string): Uint8Array {
  return new Uint8Array(
    input.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))
  );
}

function decodeAttestationObjectData(
  input: Uint8Array
): DecodedAttestationObject | undefined {
  try {
    return decodeAttestationObject(input);
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

function decodeAuthenticatorDataData(
  input: Uint8Array
): DecodedAuthenticatorData | undefined {
  try {
    return decodeAuthenticatorData(input);
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

function decodeAttestedCredentialDataData(
  input: Uint8Array
): DecodedAttestedCredentialData | undefined {
  try {
    const reader = new BufferReader(input);
    return decodeAttestedCredentialData(reader);
  } catch (error) {
    console.error(error);
    return undefined;
  }
}
