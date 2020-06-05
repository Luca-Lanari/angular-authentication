import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomStateMatcher} from '../../shared/error-matcher';
import {AuthenticationService} from '../authentication.service';
import {Subscription} from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, AfterViewInit, OnDestroy {
  subscription: Subscription;
  signupForm = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  });
  matcher = new CustomStateMatcher();

  constructor(private authService: AuthenticationService, private spinner: NgxSpinnerService) {
  }

  ngOnInit() {

  }
  ngAfterViewInit(): void {

  }


  signup() {
    console.log(this.signupForm.value);
    this.spinner.show();
    this.subscription = this.authService.registration(this.signupForm.value)
      .subscribe(res => {
        console.log(res);
        this.spinner.hide();
      }, error => {
        console.log(error);
        this.spinner.hide();
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
