import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { HomeComponent } from './home/home.component';
// import { NavbarComponent } from './navbar/navbar.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    HomeComponent,
    // NavbarComponent,
    // PageNotFoundComponent
  ],
  imports: [
    SharedModule
  ],
  providers: []
})
export class CoreModule { }
