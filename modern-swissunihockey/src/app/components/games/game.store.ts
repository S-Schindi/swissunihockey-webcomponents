import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { SwissUnihockeyService } from '../../services/swissunihockey.service';
import { switchMap, tap } from 'rxjs/operators';
import { CacheService } from '../../services/cache.service';
import { of } from 'rxjs/internal/observable/of';
import { Game } from './game';

export interface PlayersState {
    previousGames: Game[];
    upcomingGames: Game[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any;
}

@Injectable()
export class GamesStore extends ComponentStore<PlayersState> {
    private readonly localStorageKeyPreviousGames = 'gamesCache_previous';
    private readonly localStorageKeyUpcomingGames = 'gamesCache_upcoming';

    constructor(private swissUnihockeyService: SwissUnihockeyService, public cacheService: CacheService) {
        super({ previousGames: [], upcomingGames: [], error: null });
    }

    readonly previousGames$ = this.select(state => state.previousGames);
    readonly upcomingGames$ = this.select(state => state.upcomingGames);
    readonly error$ = this.select(state => state.error);

    readonly loadPreviousGames = this.effect<{ teamId: string }>(trigger$ =>
        trigger$.pipe(
            switchMap(({ teamId }) => {
                const cachedData = this.cacheService.getCache<Game[]>(`${this.localStorageKeyPreviousGames}_${teamId}`);
                if (cachedData) {
                    this.patchState({ previousGames: cachedData, error: null });
                    return of(cachedData);
                }
                return this.swissUnihockeyService.getPreviousGames(teamId).pipe(
                    tap({
                        next: (games: Game[]) => {
                            this.patchState({ previousGames: games, error: null });
                            this.cacheService.setCache<Game[]>(`${this.localStorageKeyPreviousGames}_${teamId}`, games);
                        },
                        error: error => this.patchState({ error })
                    })
                );
            })
        )
    );

    readonly loadUpcomingGames = this.effect<{ teamId: string }>(trigger$ =>
        trigger$.pipe(
            switchMap(({ teamId }) => {
                const cachedData = this.cacheService.getCache<Game[]>(`${this.localStorageKeyUpcomingGames}_${teamId}`);
                if (cachedData) {
                    this.patchState({ upcomingGames: cachedData, error: null });
                    return of(cachedData);
                }
                return this.swissUnihockeyService.getComingGames(teamId).pipe(
                    tap({
                        next: (games: Game[]) => {
                            this.patchState({ upcomingGames: games, error: null });
                            this.cacheService.setCache<Game[]>(`${this.localStorageKeyUpcomingGames}_${teamId}`, games);
                        },
                        error: error => this.patchState({ error })
                    })
                );
            })
        )
    );
}
