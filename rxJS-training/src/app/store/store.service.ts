import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, distinctUntilChanged, map, shareReplay } from 'rxjs';

export interface AppState {
  limit: number;
  offset: number;
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private state = new BehaviorSubject<AppState>({
    limit: 10,
    offset: 0
  })

  private incLimitAction = new Subject<number>()
  private decLimitAction = new Subject<number>()
  private incOffsetAction = new Subject<number>()
  private decOffsetAction = new Subject<number>()

  limit$ = this.createSelector(state => state.limit);
  offset$ = this.createSelector(state => state.offset);

  constructor() {
    this.createReducer(this.incLimitAction, (state, limit) => {
      state.limit += limit;
      return state;
    })
    this.createReducer(this.decLimitAction, (state, limit) => {
      state.limit -= limit;
      return state;
    })
    this.createReducer(this.incOffsetAction, (state, offset) => {
      state.offset += offset;
      return state;
    })
    this.createReducer(this.decOffsetAction, (state, offset) => {
      state.offset -= offset;
      return state;
    })
  }

  incLimit(value: number) {
    this.incLimitAction.next(value)
  }
  decLimit(value: number) {
    this.decLimitAction.next(value)
  }
  incOffset(value: number) {
    this.incOffsetAction.next(value)
  }
  decOffset(value: number) {
    this.decOffsetAction.next(value)
  }

  private createSelector<T>(selector: (state: AppState) => T): Observable<T> {
    return this.state.pipe(
      map(selector),
      distinctUntilChanged(),
      shareReplay(1)
    )
  }

  private createReducer<T>(
    action$: Observable<T>,
    accumulator: (state: AppState, action: T) => AppState
  ) {
    action$.subscribe((action) => {
      const state = { ...this.state.value };
      const newState = accumulator(state, action)
      this.state.next(newState);
    })
  }
}
