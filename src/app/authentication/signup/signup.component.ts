import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomStateMatcher} from '../../shared/error-matcher';
import {AuthenticationService} from '../authentication.service';
import {Subscription} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';
import { Router } from '@angular/router';

import {TokenPayload} from '../../shared/interfaces/TokenPayload';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, AfterViewInit, OnDestroy {
  subscription: Subscription;
  user: TokenPayload;

  signupForm = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  });
  matcher = new CustomStateMatcher();

  constructor(private authService: AuthenticationService, private spinner: NgxSpinnerService, private router: Router) {
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {

  }


  signup() {
    console.log(this.signupForm.value);
    this.spinner.show();
    this.user = {
      email: this.signupForm.value.email,
      name: this.signupForm.value.name,
      surname: this.signupForm.value.surname,
      password: this.signupForm.value.password
    };

    this.subscription = this.authService.register(this.user)
      .subscribe(res => {
        this.spinner.hide();
        console.log(res);
        this.router.navigateByUrl('/profile');

      }, error => {
        console.log('error: ', error);
        this.spinner.hide();
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
