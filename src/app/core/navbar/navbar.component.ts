import {Component, OnInit, ChangeDetectorRef, AfterViewChecked} from '@angular/core';
import { AuthenticationService } from '../../authentication/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterViewChecked {

  constructor(private authService: AuthenticationService, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

}
