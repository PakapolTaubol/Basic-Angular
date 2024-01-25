import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrl: './pokemon-search.component.css'
})
export class PokemonSearchComponent {
  input: string = '';
  @Input() pokemonList: any[] = [];
  @Input() pokemonFiltered: any[] = [];

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
}
