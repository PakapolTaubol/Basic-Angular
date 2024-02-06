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
    this.store.fetchPokemonData().subscribe((pokemonData) => {
      this.pokemonList = pokemonData;
      this.pokemonFiltered = this.pokemonList;
      // console.log(this.pokemonFiltered);
    })
    this.store.loadPokemon()
    console.log(this.store.pokemons$);
  }

  onSearch(): void {
    this.filterPokemon(this.input);
  }

  ngOnInit(): void {
    this.fetchPokemon();
  }
}
