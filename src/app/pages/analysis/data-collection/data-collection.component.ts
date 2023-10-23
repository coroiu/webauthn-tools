import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  templateUrl: './data-collection.component.html',
  imports: [CommonModule, HttpClientModule],
  standalone: true,
})
export class DataCollectionComponent {
  script$: Observable<string>;

  constructor(httpClient: HttpClient) {
    this.script$ = httpClient
      .get('assets/connectors/console-based.js', { responseType: 'text' })
      .pipe(map((script) => `eval(atob("${btoa(script)}"))`));
  }
}
