import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PokemonService } from './pokemon.service';
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { PaginatorModule } from "primeng/paginator";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    HttpClientModule,
    InputTextModule,
    ButtonModule,
    PaginatorModule,
    BrowserModule
  ],
  providers: [
    PokemonService,
  ],
  exports: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
