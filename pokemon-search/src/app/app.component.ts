import {Component, OnInit} from '@angular/core';
import {PokemonService} from './pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  pokemonList: any[] = [];
  pokemonFiltered: any[] = [];
  constructor(private pokemonService: PokemonService) {}

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
