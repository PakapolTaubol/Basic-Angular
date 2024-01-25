import {Component, OnInit} from '@angular/core';
import {PokemonService} from './pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'pokemon-search';
  inputText: string = '';
  pokemonList: any[] = [];
  pokemonFiltered: any[] = [];

  constructor(private pokemonService: PokemonService) {}

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
