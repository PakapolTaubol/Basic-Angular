import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PokemonService } from './pokemon.service';
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {PaginatorModule} from "primeng/paginator";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    InputTextModule,
    ButtonModule,
    PaginatorModule,
    BrowserModule
  ],
  providers: [
    PokemonService,
    InputTextModule,
    ButtonModule,
    PaginatorModule,
    BrowserModule],
  exports: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
