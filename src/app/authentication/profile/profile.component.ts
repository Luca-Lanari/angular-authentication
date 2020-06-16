import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomStateMatcher } from '../../shared/error-matcher';
import { Subscription } from 'rxjs';

import { AuthenticationService } from '../../_services/authentication.service';
import { UserDetail } from '../../shared/interfaces/UserDetail';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }
  userDetail: UserDetail;
  furtherUserInfoForm = new FormGroup({});
  matcher = new CustomStateMatcher();
  ngOnInit() {
    this.authService.profile().subscribe(user => {
      this.userDetail = user;
    }, err => {
      console.log(err);
    });
  }



}
