
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';
import { PlantComponent } from './plant/plant.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { LimitOffsetComponent } from './limit-offset/limit-offset.component';


@NgModule({
  declarations: [
    AppComponent,
    PlantComponent,
    LimitOffsetComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
  ],
  exports: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
