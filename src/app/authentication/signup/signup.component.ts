import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomStateMatcher } from '../../shared/error-matcher';
import { AuthenticationService } from '../../_services/authentication.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';

import { TokenPayload } from '../../shared/interfaces/TokenPayload';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  user: TokenPayload;

  signupForm = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
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
        this.flashMessage.showFlashMessage({
          messages: [error.error.error],
          type: 'danger',
          dismissible: true,
          timeout: 2000,
        });
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
