import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
  ],
})
export class LoginComponent implements OnInit {
  protected username: string = '';
  protected password: string = '';
  protected conditionalCreate: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  async login() {
    if (this.conditionalCreate) {
      await this.autoCreatePasskey();
    }

    void this.router.navigate(['/account-demo/profile', this.username], {
      queryParams: { conditionalCreate: this.conditionalCreate },
    });
  }

  private async autoCreatePasskey() {
    if ((PublicKeyCredential as any).getClientCapabilities === undefined) {
      console.log('Conditional creation unavailable');
      // this.capabilities.conditionalCreate = false;
      return;
    }

    const capabilities = await (
      PublicKeyCredential as any
    ).getClientCapabilities();
    if (!capabilities.conditionalCreate) {
      console.log('Conditional creation unavailable');
      // this.capabilities.conditionalCreate = false;
      return;
    }

    const challenge = new Uint8Array(32);
    window.crypto.getRandomValues(challenge);

    // this.capabilities.conditionalCreate = true;

    try {
      await window.navigator.credentials.create({
        mediation: 'conditional',
        publicKey: {
          challenge: challenge,
          rp: {
            name: 'WebAuthn Tools Demo',
          },
          user: {
            id: new TextEncoder().encode(this.username),
            name: this.username,
            displayName: this.username,
          },
          pubKeyCredParams: [
            {
              type: 'public-key',
              alg: -7,
            },
          ],
        },
        // Needed because `mediation` is not yet supported in current TypeScript definitions
      } as CredentialCreationOptions);
      // this.createPasskey.success = true;
    } catch (e) {
      console.error('Failed to auto-register a passkey:', e);
      // this.createPasskey.error = String(e);
    }
  }
}
