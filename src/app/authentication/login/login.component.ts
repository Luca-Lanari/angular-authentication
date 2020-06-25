import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';
import { TranslateService } from '@ngx-translate/core';
import { Toaster } from 'ngx-toast-notifications';

import { CustomStateMatcher } from '../../_helpers/error-matcher';
import { TokenPayload } from '../../_interfaces/TokenPayload';
import { CustomErrorMessage } from '../../_helpers/custom-error-message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  signin: TokenPayload;
  subscription: Subscription;
  hide = true;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  });
  matcher = new CustomStateMatcher();
  errorMessage = new CustomErrorMessage(this.translate);

  constructor(private authService: AuthenticationService,
              private router: Router,
              private translate: TranslateService,
              private toaster: Toaster) {
  }

  ngOnInit() {
  }

  userLogin() {
    this.signin = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.subscription = this.authService.login(this.signin).subscribe(res => {
      this.router.navigateByUrl('/profile');
    }, err => {
      this.toaster.open({
        type: 'danger',
        text: this.errorMessage.selectErrorMessage(err.error.error_code)
      });
    });
  }

  togglePassword() {
    this.hide = !this.hide;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
