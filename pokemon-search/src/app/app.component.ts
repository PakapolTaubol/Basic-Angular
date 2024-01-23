import { Component, Input, OnInit, input } from '@angular/core';
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
  input_text: string = '';
  pokemon_list: any[] = [];
  pokemon_filtered: any[] = [];

  searchOn(text: string) {
    text ? this.input_text = text : this.input_text = ''
  }

  fetchPokemonData() {
    const promises: Promise<any>[] = [];
    for (let i = 1; i <= 150; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
      promises.push(fetch(url).then((res) => res.json()));
    }

    Promise.all(promises)
      .then((pokemonData) => {
        this.pokemon_list = pokemonData;
        this.pokemon_filtered = this.pokemon_list;
      })
      .catch((error) => {
        console.error('Error fetching Pokemon data:', error);
      });
  }

  filterPokemon(text: string) {
    if (!text) {
      return this.pokemon_filtered = this.pokemon_list;
    }
    const lowercaseText = text.toLowerCase();
    return this.pokemon_filtered = this.pokemon_list.filter(pokemon => pokemon.name.toLowerCase().includes(lowercaseText));
  }

  ngOnInit(): void {
    this.fetchPokemonData()
  }
}
