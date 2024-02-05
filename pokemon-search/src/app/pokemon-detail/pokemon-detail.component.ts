import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { ActivatedRoute, Router } from '@angular/router';
import { formatPokemonId, formatName } from '../utils/functions';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.css'
})
export class PokemonDetailComponent implements OnInit {

  constructor(private pokemonService: PokemonService, private activatedRoute: ActivatedRoute, private router: Router) { }

  pokemon: any;
  prevPokemon: any;
  nextPokemon: any;
  id: number = 0;

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.queryParams['id']); // Ensure id is a number
    this.fetchPokemonData();
  }

  fetchPokemonData(): void {
    const pokemonRequests = [
      this.pokemonService.fetchPokemonById(this.id),
      this.pokemonService.fetchPokemonById(this.id - 1),
      this.pokemonService.fetchPokemonById(this.id + 1)
    ];

    forkJoin(pokemonRequests).subscribe(([data, prevData, nextData]) => {
      this.pokemon = {
        id: formatPokemonId(data.id),
        name: formatName(data.name),
        img: data.sprites['front_default'],
        types: data.types.map((types: any) => formatName(types.type.name)),
        weight: data.weight,
        base_experience: data.base_experience,
        ability: formatName(data.abilities[0].ability.name),
        hidden_ability: formatName(data.abilities[1].ability.name),
      };

      this.prevPokemon = prevData ? {
        id: (prevData.id),
        name: formatName(prevData.name),
        img: prevData.sprites['front_default'],
      } : null;

      this.nextPokemon = nextData ? {
        id: (nextData.id),
        name: formatName(nextData.name),
        img: nextData.sprites['front_default'],
      } : null;
    });
  }
  onClickDetail(id: number): void {
    this.router.navigate(['/detail'], { queryParams: { id: id } })
  }
}
