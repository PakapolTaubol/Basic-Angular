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

  constructor(private pokemonService: PokemonService) { }

  onSearch(): void {
    this.filterPokemon(this.input);
  }

  filterPokemon(text: string): void {
    const pList = this.pokemonList;
    if (text) {
      const lowercaseText = text.toLowerCase();
      this.pokemonFiltered = pList.filter(mon =>
        mon.name
          .toLowerCase()
          .includes(lowercaseText))
    } else {
      this.pokemonFiltered = pList
    }
  }

  fetchPokemon(): void {
    this.pokemonService.fetchPokemonData().subscribe((pokemonData) => {
      this.pokemonList = pokemonData;
      this.pokemonFiltered = this.pokemonList;
    })
  }

  ngOnInit(): void {
    this.fetchPokemon();
  }
}
