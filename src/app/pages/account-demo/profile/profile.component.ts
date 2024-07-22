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
  protected createPasskey: { error?: string; success?: boolean } = {};

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.username = params.get('username') || '';
    });

    // this.route.queryParamMap
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe(async (params) => {
    //     if (params.get('conditionalCreate') === 'true') {
    //       this.autoCreatePasskey();
    //     }
    //   });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
