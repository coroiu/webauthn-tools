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
  protected conditionalCreate: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  login() {
    void this.router.navigate(['/account-demo/profile', this.username], {
      queryParams: { conditionalCreate: this.conditionalCreate },
    });
  }
}
