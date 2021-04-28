import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './Services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  serverSideErros: string[] = [];
  @ViewChild('f') form: NgForm;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  switchMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.form.reset();
  }

  onSubmit(): void {
    let { username, password, email } = this.form.form.value;
    console.log(this.form.form.value);
    let authObs;
    if (this.isLoginMode) {
      authObs = this.authService.login(username, password);
    } else {
      authObs = this.authService.signup(username, password, email);
    }

    authObs.subscribe(
      () => {
        this.router.navigate(['/heroes']);
      },
      (errors: string[]) => {
        this.serverSideErros = errors;
      }
    );
  }
}
