import { Component, Input } from '@angular/core';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css'
})
export class PokemonListComponent {
  inputText: string = '';
  // @Input() pokemonList: any[] = [];
  @Input() pokemonFiltered: any[] = [];
}
