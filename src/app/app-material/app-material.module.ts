import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatToolbarModule,
  MatCardModule,
  MatProgressSpinnerModule
} from '@angular/material';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatToolbarModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatToolbarModule,
    MatCardModule,
    MatProgressSpinnerModule
  ]
})
export class AppMaterialModule { }
