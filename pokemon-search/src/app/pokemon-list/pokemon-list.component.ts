import { Component, Input } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css'
})
export class PokemonListComponent {
  constructor(private router: Router) { }
  inputText: string = '';
  @Input() pokemonFiltered: any[] = [];

  onClickDetail(id: number): void {
    this.router.navigateByUrl(`/detail/${id}`)
  }
}
