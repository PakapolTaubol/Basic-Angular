import { Component, OnChanges, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { ActivatedRoute, Router } from '@angular/router';
import { formatPokemonId, formatName } from '../utils/functions';
import { Observable, catchError, forkJoin, of, shareReplay, switchMap, tap } from 'rxjs';

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

  pokemon: any;
  prevPokemon: any;
  nextPokemon: any;
  id: number = 0;

  pokemonData$ = this.activatedRoute.queryParamMap.pipe(
    tap(params => this.id = Number(params.get('id'))),
    switchMap(params => this.fetchPokemonData(Number(params.get('id')))),
    shareReplay(1)
  );

  fetchPokemonData(id: number): Observable<any[]> {
    // const existingData = [this.pokemon, this.prevPokemon, this.nextPokemon].find(data => data?.id === id);

    // if (existingData) {
    //   console.log('true');
    //   return of([this.nextPokemon, this.pokemon, this.prevPokemon,]);
    // }

    const pokemonRequests = [
      this.pokemonService.fetchPokemonById(id).pipe(
        tap(data => this.pokemon = this.formatPokemonData(data)),
        shareReplay(1)
      ),
      this.pokemonService.fetchPokemonById(id > 1 ? id - 1 : 1).pipe(
        tap(data => this.prevPokemon = this.formatPokemonData(data)),
        shareReplay(1)
      ),
      this.pokemonService.fetchPokemonById(id > 0 ? id + 1 : 1).pipe(
        tap(data => this.nextPokemon = this.formatPokemonData(data)),
        shareReplay(1)
      )
    ];
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
    this.fetchPokemonData(id)
  }

  onBackButton(): void {
    this.router.navigate([''])
  }

  ngOnInit() {
    this.pokemonData$.subscribe()
  }
}
