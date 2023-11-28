import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { getCoroiu } from '../../../types/window-coroiu';
import { CommonModule } from '@angular/common';

@Component({
  templateUrl: './existence-checker.component.html',
  styleUrls: ['./existence-checker.component.scss'],
  imports: [CommonModule, MatCardModule],
  standalone: true,
})
export class ExistenceCheckerComponent implements OnInit {
  protected passkeyProviderDetected = false;

  ngOnInit(): void {
    this.passkeyProviderDetected = this.checkPasskeyProvider();
  }

  private checkPasskeyProvider(): boolean {
    return window.navigator.credentials.get !== getCoroiu().webauthn.native.get;
  }
}
