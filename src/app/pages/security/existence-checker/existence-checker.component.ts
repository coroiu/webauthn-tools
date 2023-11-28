import { Component, OnInit } from '@angular/core';
import { getCoroiu } from '../../../types/window-coroiu';

@Component({
  templateUrl: './existence-checker.component.html',
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
