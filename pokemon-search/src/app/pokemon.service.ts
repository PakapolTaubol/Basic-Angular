import { Injectable } from '@angular/core';
import { forkJoin, from, map, Observable, range } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private http: HttpClient) { }
  fetchPokemonData(): Observable<any> {
    const pokemons = []
    for (let i = 1; i <= 50; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
      pokemons.push(this.http.get(url))
    }
    return forkJoin(pokemons);
  }
  
  fetchPokemonById(id: number): Observable<any> {
    return this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }
}
