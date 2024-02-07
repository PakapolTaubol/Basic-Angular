import { Component, Input, OnInit, Output } from '@angular/core';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrl: './pokemon-search.component.css'
})
export class PokemonSearchComponent implements OnInit {
  pokemonList: any[] = [];
  pokemonFiltered: any[] = [];
  input: string = '';

  constructor(private store: PokemonService) {
    this.store = store;
  }

  getStore() {
    return this.store
  }

  filterPokemon(text: string): void {
    const pokeList = this.pokemonList;
    if (text) {
      const lowercaseText = text.toLowerCase();
      this.pokemonFiltered = pokeList.filter(monster =>
        monster.name
          .toLowerCase()
          .includes(lowercaseText))
    } else {
      this.pokemonFiltered = pokeList
    }
  }

  fetchPokemon(): void {
    this.store.pokemons$.subscribe((pokemonData) => {
      this.pokemonList = pokemonData;
      this.pokemonFiltered = this.pokemonList;
    })
  }

  onSearch(): void {
    this.filterPokemon(this.input);
  }

  ngOnInit(): void {
    this.store.loadPokemon();
    this.fetchPokemon();
  }
}
