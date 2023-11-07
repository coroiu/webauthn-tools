import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';

import { ReplaySubject, Subject, takeUntil } from 'rxjs';
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
import { WebAuthnCreateMetadata } from './metadata';
import { ActivatedRoute } from '@angular/router';
import { exampleData } from './example.data';

@Component({
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatExpansionModule,
    MatInputModule,
    OptionsComponent,
    PrettyJsonComponent,
  ],
  standalone: true,
})
export class AnalyzeComponent implements OnInit, OnDestroy {
  private activatedRoute = inject(ActivatedRoute);
  private onDestroy$ = new Subject<void>();

  protected data$ = new ReplaySubject<WebAuthnChallengeResponse>(1);
  protected panelExpanded = true;

  ngOnInit(): void {
    this.data$.pipe(takeUntil(this.onDestroy$)).subscribe(() => {
      this.panelExpanded = false;
    });

    this.activatedRoute.queryParams
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((params) => {
        if ('example' in params) {
          this.data$.next(decode(exampleData) as any);
        }
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
      const parsed = decode(data.target.value.replaceAll(' ', ''));
      console.log(parsed);
      this.data$.next(parsed as any);
    } catch {}
  }

  getMetadata(
    data: WebAuthnChallengeResponse
  ): JsonMetadata<WebAuthnChallengeResponse> {
    if (data.method === 'navigator.credentials.create') {
      return WebAuthnCreateMetadata;
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

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}

function decode(input: string): unknown {
  const decoded = atob(input);
  const parsed = JSON.parse(decoded);
  return parsed;
}
