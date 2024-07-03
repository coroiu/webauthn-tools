import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import {
  DecodedWebAuthnChallengeResponse,
  WebAuthnChallengeResponse,
} from '../../../types/webauthn-challenge-response';
import { OptionsComponent } from '../../../options/options.component';
import { PrettyJsonComponent } from '../../../pretty-json/pretty-json.component';
import { JsonMetadata } from '../../../pretty-json/json-metadata';

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

  protected data$ = new ReplaySubject<{
    raw: WebAuthnChallengeResponse;
    decoded: DecodedWebAuthnChallengeResponse | undefined;
  }>(1);

  ngOnInit(): void {
    this.data$.pipe(takeUntil(this.onDestroy$)).subscribe(() => {
      // this.panelExpanded = false;
    });

    this.activatedRoute.queryParams
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((params) => {
        // if ('example' in params) {
        //   const raw = read(exampleData);
        //   const decoded = decode(raw);
        //   this.data$.next({ raw, decoded });
        //   this.displayMode = 'pretty';
        // }
      });
  }

  readData(data: Event) {
    if (
      !data.target ||
      !('value' in data.target) ||
      typeof data.target.value !== 'string'
    ) {
      return;
    }

    try {
      const raw = read(data.target.value.replaceAll(' ', ''));
      const decoded = decode(raw);
      this.data$.next({ raw, decoded });
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

function read(input: string): WebAuthnChallengeResponse {
  const decoded = atob(input);
  const parsed = JSON.parse(decoded);
  return parsed;
}

function decode(
  input: WebAuthnChallengeResponse
): DecodedWebAuthnChallengeResponse | undefined {
  throw new Error('Method not implemented.');
  // try {
  //   if (input.method === 'navigator.credentials.create') {
  //     return decodeCreate(input);
  //   }
  //   return decodeGet(input);
  // } catch (error) {
  //   console.error(error);
  //   return undefined;
  // }
}
