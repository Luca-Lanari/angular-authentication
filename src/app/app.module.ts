import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material/app-material.module';
import { SharedModule } from './shared/shared.module';
import { PageNotFoundModule } from './page-not-found/page-not-found.module';
import { CoreModule } from './core/core.module';
import { NgFlashMessagesModule } from 'ng-flash-messages';
import { LoaderComponent } from './shared/loader/loader.component';
import { LoaderService } from './_services/loader.service';
import { LoaderInterceptor } from './_interceptors/loader.interceptor';

import { NavbarComponent } from './core/navbar/navbar.component';
import {AuthenticationInterceptor} from './_interceptors/authentication.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    PageNotFoundModule,
    CoreModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgFlashMessagesModule
  ],
  providers: [LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
