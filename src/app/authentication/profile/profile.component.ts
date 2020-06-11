import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../authentication.service';
import { UserDetail } from '../../shared/interfaces/UserDetail';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }
  userDetail: UserDetail;

  //TODO Add Loader
  ngOnInit() {
    this.authService.profile().subscribe(user => {
      console.log('user profile FE: ', user);
      this.userDetail = user;
    }, err => {
      console.log(err);
    });
  }

}
