import { Injectable } from '@angular/core';
import { forkJoin, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private httClient: HttpClient) { }
  fetchPokemonData(): Observable<any> {
    const obj = []
    for (let i = 1; i <= 50; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
      obj.push(this.httClient.get(url))
    }
    return forkJoin(obj);
  }
  fetchPokemonById(id: number): Observable<any> {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    return this.httClient.get(url);
  }
  // fetchPokemonTarget(id: number): Observable<any> {
  //   const obj = []
  //   const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  //   obj.push(this.httClient.get(url))
  //   return forkJoin(obj);
  // }
}
