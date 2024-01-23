import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'pokemon-search';
  inputText: string = '';
  pokemonList: any[] = [];
  pokemonFiltered: any[] = [];

  searchOn(text: string): void {
    text ? this.inputText = text : this.inputText = ''
  }

  fetchPokemonData(): void {
    const promises: Promise<object>[] = [];
    for (let i = 1; i <= 150; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
      promises.push(fetch(url).then((res) => res.json()));
    }

    Promise.all(promises)
      .then((pokemonData) => {
        this.pokemonList = pokemonData;
        this.pokemonFiltered = this.pokemonList;
      })
      .catch((error) => {
        console.error('Error fetching Pokemon data:', error);
      });
  }

  filterPokemon(text: string): void {
    if (!text) {
      this.pokemonFiltered = this.pokemonList;
    }
    const lowercaseText = text.toLowerCase();
    this.pokemonFiltered = this.pokemonList.filter(pokemon => pokemon.name.toLowerCase().includes(lowercaseText));
  }

  ngOnInit(): void {
    this.fetchPokemonData()
  }
}
