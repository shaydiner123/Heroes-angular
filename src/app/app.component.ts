import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/Services/auth.service';
import { User } from './auth/user.model';
import { HttpErrorService } from './shared/Services/httpError.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  error: any;
  errorSubscription: Subscription;
  constructor(
    private authService: AuthService,
    private httpErrorService: HttpErrorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.user.subscribe((user: User) => {
      if (user !== null) {
        this.router.navigate(['/heroes']);
      }
    });
    this.authService.autoLogin();
    this.errorSubscription = this.httpErrorService.errorSubject.subscribe(
      (error: any) => {
        this.error = error;
      }
    );
  }
}
