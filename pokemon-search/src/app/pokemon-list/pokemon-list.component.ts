import { Component, Input } from '@angular/core';
import { formatPokemonId, formatName } from '../utils/functions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css'
})
export class PokemonListComponent {
  constructor(private router: Router) { }
  @Input() pokemonFiltered: any[] = [];

  onClickDetail(id: number): void {
    this.router.navigate(['/detail'], { queryParams: { id: id } })
  }
}
