import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, distinctUntilChanged, forkJoin, map, NEVER, Observable, shareReplay, Subject, Subscription, switchMap, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";

export interface PokemonState {
  pokemons: any[];
}
@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private state = new BehaviorSubject<PokemonState>({
    pokemons: []
  })

  private loadPokemonAction = new Subject<void>();
  private loadedPokemonSuccessAction = new Subject<any[]>();
  private loadedPokemonErrorAction = new Subject<any>();

  pokemons$ = this.createSelector(state => state.pokemons);

  constructor(private http: HttpClient) {
    this.createEffect(this.loadPokemonAction.pipe(switchMap(() => {
      const pokemonRequests = Array.from({ length: 200 }, (_, i) => this.http.get(`https://pokeapi.co/api/v2/pokemon/${i + 1}`));
      return forkJoin(pokemonRequests).pipe(
        catchError(err => {
          this.loadedPokemonErrorAction.next(err);
          return NEVER
        }))
    }), tap(response => {
      this.loadedPokemonSuccessAction.next(response)
    })))

    this.createEffect(this.loadedPokemonErrorAction.pipe(
      tap(err => {
        console.error(err);
      })
    ))

    this.createReducer(this.loadedPokemonSuccessAction, (state, pokemons) => {
      state.pokemons = pokemons
      return state;
    })
  }

  fetchPokemonData(): Observable<any> {
    const pokemonRequests = Array.from({ length: 50 }, (_, i) => this.http.get(`https://pokeapi.co/api/v2/pokemon/${i + 1}`));
    return forkJoin(pokemonRequests);
  }

  fetchPokemonById(id: number): Observable<any> {
    return this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }

  loadPokemon() {
    this.loadPokemonAction.next();
  }

  private createSelector<T>(selector: (state: PokemonState) => T): Observable<T> {
    return this.state.pipe(
      map(selector),
      distinctUntilChanged(),
      shareReplay(1)
    )
  }

  private createReducer<T>(
    action$: Observable<T>,
    accumulator: (state: PokemonState, action: T) => PokemonState
  ) {
    action$.subscribe((action) => {
      const state = { ...this.state.value };
      const newState = accumulator(state, action);
      this.state.next(newState);
    })
  }

  private createEffect<T>(effect$: Observable<T>): Subscription {
    return effect$.subscribe();
  }
}
