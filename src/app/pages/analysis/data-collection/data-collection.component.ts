import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';
import { Observable, map, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';

import { minify } from 'terser';

@Component({
  templateUrl: './data-collection.component.html',
  imports: [CommonModule, HttpClientModule, MatExpansionModule],
  standalone: true,
})
export class DataCollectionComponent {
  scripts$: Observable<{ minified: string; b64: string; raw: string }>;

  constructor(httpClient: HttpClient) {
    this.scripts$ = httpClient
      .get('assets/connectors/console-based.js', { responseType: 'text' })
      .pipe(
        switchMap(async (script) => {
          const minified = (await minify(script)).code ?? '';

          return {
            minified: minified,
            b64: `eval(atob("${btoa(minified)}"))`,
            raw: script,
          };
        })
      );
  }
}
