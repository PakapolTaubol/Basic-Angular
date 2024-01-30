import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { formatPokemonId, formatName } from '../utils/functions';

interface Pokemon {
  id: string;
  name: string;
  img: string;
  types: string[];
  weight: number;
}

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.css'
})
export class PokemonDetailComponent implements OnInit {

  constructor(private pokemonService: PokemonService, private activatedRoute: ActivatedRoute) {
  }

  pokemon: Pokemon | null = null;

  getPokemonById(): void {
    const id = this.activatedRoute.snapshot.queryParams['id'];
    this.pokemonService.fetchPokemonById(id).subscribe((data) => {
      this.pokemon = {
        id: formatPokemonId(data.id),
        name: formatName(data.name),
        img: data.sprites['front_default'],
        types: data.types.map((types: any) => formatName(types.type.name)),
        weight: data.weight,
      }
    });
  }

  ngOnInit(): void {
    this.getPokemonById()
  }
}
