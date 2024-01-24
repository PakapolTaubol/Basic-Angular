import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PokemonService } from './pokemon.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule
  ],
  providers: [PokemonService],
  exports: [AppComponent]
})
export class AppModule { }
