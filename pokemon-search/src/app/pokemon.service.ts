import { Injectable } from '@angular/core';
import {forkJoin, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private httClient: HttpClient) { }
  fetchPokemonData(): Observable<any> {
    const obj = []
    for (let i = 1; i <= 150; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
      obj.push(this.httClient.get(url))
    }
    return forkJoin(obj);
  }
}
