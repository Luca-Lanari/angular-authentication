import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomStateMatcher } from '../../_helpers/error-matcher';
import { AuthenticationService } from '../../_services/authentication.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Toaster } from 'ngx-toast-notifications';

import { TokenPayload } from '../../_interfaces/TokenPayload';
import { CustomValidators } from '../../_helpers/custom-validators';
import { CustomErrorMessage } from '../../_helpers/custom-error-message';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  user: TokenPayload;
  hidePsw = true;
  hideConfPsw = true;
  checkPassword = new CustomValidators();
  errorMessage = new CustomErrorMessage(this.translate);
  signupForm = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(4)])
  }, { validators:  [this.checkPassword.checkPasswords] });

  matcher = new CustomStateMatcher();

  constructor(private authService: AuthenticationService,
              private router: Router,
              private translate: TranslateService,
              private toaster: Toaster) {
  }

  // checkPasswords(group: FormGroup) {
  //   const pass = group.get('password').value;
  //   // console.log(group.controls.password.value);
  //   console.log('pass: ', pass);
  //   const confirmPass = group.get('confirmPassword').value;
  //   console.log('conf pass: ', confirmPass);
  //   return pass === confirmPass ? null : { notSame: true };
  // }

  ngOnInit() {

  }

  signup() {
    this.user = {
      email: this.signupForm.value.email,
      name: this.signupForm.value.name,
      surname: this.signupForm.value.surname,
      password: this.signupForm.value.password
    };

    this.subscription = this.authService.register(this.user)
      .subscribe(res => {
        this.router.navigateByUrl('/profile');
      }, error => {
        console.log(error.error.error_code);
        this.toaster.open({
          type: 'danger',
          text: this.errorMessage.selectErrorMessage(error.error.error_code)
        });
      });
  }

  togglePassword(passwordType: string) {
    if (passwordType === 'password') {
      this.hidePsw = !this.hidePsw;
    } else {
      this.hideConfPsw = !this.hideConfPsw;
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
