import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    // NavbarComponent,
    HomeComponent
  ],
  imports: [
    SharedModule
  ],
  providers: []
})
export class CoreModule { }
