import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';
import { PlantComponent } from './plant/plant.component';


@NgModule({
  declarations: [
    AppComponent,
    PlantComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    AppRoutingModule
  ],
  exports: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
