import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PokemonService } from './pokemon.service';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule, InputTextModule, ButtonModule],
  providers: [PokemonService, InputTextModule, ButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'pokemon-search';
  inputText: string = '';
  pokemonList: any[] = [];
  pokemonFiltered: any[] = [];

  constructor(private pokemonService: PokemonService) { }

  fetchPokemon(): void {
    this.pokemonService.fetchPokemonData().subscribe((pokemonData) => {
      this.pokemonList = pokemonData;
      this.pokemonFiltered = this.pokemonList;
    })
  }

  searchOn(text: string): void {
    text ? this.inputText = text : this.inputText = ''
    const lowercaseText = text.toLowerCase();
    text ? this.pokemonFiltered = this.pokemonList.filter(pokemon => pokemon.name.toLowerCase().includes(lowercaseText)) : this.pokemonFiltered = this.pokemonList;
  }

  ngOnInit(): void {
    this.fetchPokemon();
  }
}
