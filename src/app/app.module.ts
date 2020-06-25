import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './_app-material/app-material.module';
import { SharedModule } from './shared/shared.module';
import { PageNotFoundModule } from './page-not-found/page-not-found.module';
import { CoreModule } from './core/core.module';
import { ToastNotificationsModule } from 'ngx-toast-notifications';
import { LoaderService } from './_services/loader.service';
import { LoaderInterceptor } from './_interceptors/loader.interceptor';
import { AuthenticationInterceptor } from './_interceptors/authentication.interceptor';

import { LoaderComponent } from './shared/loader/loader.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { FooterComponent } from './core/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoaderComponent,
    FooterComponent
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
    ToastNotificationsModule.forRoot({
      duration: 3000,
      position: 'bottom-right'
    })
  ],
  providers: [LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }

