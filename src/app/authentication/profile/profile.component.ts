import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomStateMatcher } from '../../_helpers/error-matcher';
import { Subscription } from 'rxjs';

import { AuthenticationService } from '../../_services/authentication.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { UserDetail } from '../../_interfaces/UserDetail';
import { TokenPayload } from '../../_interfaces/TokenPayload';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  userDetail: UserDetail;
  // userInfoForm;
  userData: TokenPayload;
  matcher;

  constructor(private authService: AuthenticationService, private flashMessage: NgFlashMessageService) {
  }

  userInfoForm = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl(''),
    city: new FormControl(''),
    // zipCode: new FormControl('')
  });
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
        messages: ['Updated user info!'],
        type: 'success',
        dismissible: true,
        timeout: 2000,
      });
    }, err => {
      this.flashMessage.showFlashMessage({
        messages: [err.message],
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
