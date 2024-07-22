import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

type Capabilities = {
  conditionalCreate?: boolean;
};

@Component({
  templateUrl: './profile.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class ProfileComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  protected username: string = '';
  protected capabilities: Capabilities = {};

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.username = params.get('username') || '';
    });

    this.route.queryParamMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(async (params) => {
        if (params.get('conditionalCreate') === 'true') {
          this.autoCreatePasskey();
        }
      });
  }

  private async autoCreatePasskey() {
    if ((PublicKeyCredential as any).getClientCapabilities === undefined) {
      console.log('Conditional creation unavailable');
      this.capabilities.conditionalCreate = false;
      return;
    }

    const capabilities = await (
      PublicKeyCredential as any
    ).getClientCapabilities();
    if (!capabilities.conditionalCreate) {
      console.log('Conditional creation unavailable');
      this.capabilities.conditionalCreate = false;
      return;
    }

    this.capabilities.conditionalCreate = true;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
