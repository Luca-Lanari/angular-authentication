import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomStateMatcher } from '../../_helpers/error-matcher';
import { Subscription } from 'rxjs';

import { AuthenticationService } from '../../_services/authentication.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { TranslateService } from '@ngx-translate/core';

import { UserDetail } from '../../_interfaces/UserDetail';
import { TokenPayload } from '../../_interfaces/TokenPayload';
import { CustomErrorMessage } from '../../_helpers/custom-error-message';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  userDetail: UserDetail;
  userData: TokenPayload;
  matcher;
  errorMessage = new CustomErrorMessage(this.translate);

  userInfoForm = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl(''),
    city: new FormControl(''),
    // zipCode: new FormControl('')
  });

  constructor(private authService: AuthenticationService,
              private flashMessage: NgFlashMessageService,
              private translate: TranslateService) {
  }

  ngOnInit() {
    this.matcher = new CustomStateMatcher();
    this.subscription = this.authService.profile().subscribe(user => {
      this.userDetail = user;
      this.userInfoForm.controls.name.setValue(this.userDetail.name);
      this.userInfoForm.controls.surname.setValue(this.userDetail.surname);
      this.userInfoForm.controls.email.setValue(this.userDetail.email);
      this.userInfoForm.controls.address.setValue(this.userDetail.address);
      this.userInfoForm.controls.city.setValue(this.userDetail.city);
    }, err => {
      console.log(err);
    });
  }

  userInfo() {
    this.userData = {
      name: this.userInfoForm.value.name,
      surname: this.userInfoForm.value.surname,
      email: this.userInfoForm.value.email,
      address: this.userInfoForm.value.address,
      city: this.userInfoForm.value.city
    };
    this.subscription = this.authService.uploadUserInfo(this.userData).subscribe(res => {
      this.flashMessage.showFlashMessage({
        messages: [this.translate.instant('messages.userInfo')],
        type: 'success',
        dismissible: true,
        timeout: 2000,
      });
    }, err => {
      // console.log('error profile: ', err.error_code);
      this.flashMessage.showFlashMessage({
        messages: [this.errorMessage.selectErrorMessage(err.error_code)],
        type: 'danger',
        dismissible: true,
        timeout: 2000,
      });
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


}
