import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomStateMatcher } from '../../_helpers/error-matcher';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { TokenPayload } from '../../_interfaces/TokenPayload';
import { AuthenticationService } from '../../_services/authentication.service';
import { NgFlashMessageService } from 'ng-flash-messages';

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

  constructor(private authService: AuthenticationService,
              private router: Router,
              private flashMessage: NgFlashMessageService) {
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
      this.flashMessage.showFlashMessage({
        messages: [err.error.message],
        type: 'danger',
        dismissible: true,
        timeout: 2000,
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
