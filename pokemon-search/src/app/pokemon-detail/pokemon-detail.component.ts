import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { ActivatedRoute, Router } from '@angular/router';
import { formatPokemonId, formatName } from '../utils/functions';
import { Observable, forkJoin, of, shareReplay, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.css'
})
export class PokemonDetailComponent implements OnInit {

  constructor(
    private pokemonService: PokemonService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  currentPokemon: any;
  prevPokemon: any;
  nextPokemon: any;
  id: number = 0;

  pokemonData$ = this.activatedRoute.queryParamMap.pipe(
    tap(params => this.id = Number(params.get('id'))),
    switchMap(params => this.fetchPokemonData(Number(params.get('id')))),
    shareReplay(1)
  );

  fetchPokemonData(id: number): Observable<any[]> {
    const cachedPokemons = [this.prevPokemon, this.nextPokemon];
    const pokemonRequests = cachedPokemons.map((pokemon, index) => {
      const offset = index;
      const pokemonId = id + offset;

      if (pokemon && pokemon.id === pokemonId) {
        return of(pokemon);
      }

      return this.pokemonService.fetchPokemonById(pokemonId).pipe(
        tap(data => {
          if (offset === -1) {
            this.prevPokemon = this.formatPokemonData(data);
          } else if (offset === 0) {
            this.currentPokemon = this.formatPokemonData(data);
          } else if (offset === 1) {
            this.nextPokemon = this.formatPokemonData(data);
          }
        }),
        shareReplay(1)
      );
    });

    return forkJoin(pokemonRequests);
  }

  private formatPokemonData(data: any): any {
    return {
      id: data.id,
      format_id: formatPokemonId(data.id),
      name: formatName(data.name),
      img: data.sprites['front_default'],
      types: data.types.map((types: any) => formatName(types.type.name)),
      weight: data.weight,
      base_experience: data.base_experience,
      ability: formatName(data.abilities[0].ability.name),
      hidden_ability: data.abilities[1] ? formatName(data.abilities[1].ability.name) : '-',
    };
  }

  onClickNextPrev(id: number): void {
    this.router.navigate(['/detail'], { queryParams: { id: id } })
  }

  onBackButton(): void {
    this.router.navigate([''])
  }

  ngOnInit() {
    this.pokemonData$.subscribe()
  }
}
