import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { SwissUnihockeyService } from '../../services/swissunihockey.service';
import { switchMap, tap } from 'rxjs/operators';
import { Player } from './player';
import { CacheService } from '../../services/cache.service';
import { of } from 'rxjs/internal/observable/of';

export interface PlayersState {
    players: Player[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any;
}

@Injectable()
export class PlayersStore extends ComponentStore<PlayersState> {
    private readonly localStorageKey = 'playersCache';

    constructor(private swissUnihockeyService: SwissUnihockeyService, public cacheService: CacheService) {
        super({ players: [], error: null });
    }

    readonly players$ = this.select(state => state.players);
    readonly error$ = this.select(state => state.error);

    readonly loadPlayers = this.effect<{ teamId: string }>(trigger$ =>
        trigger$.pipe(
            switchMap(({ teamId }) => {
                const cachedData = this.cacheService.getCache<Player[]>(`${this.localStorageKey}_${teamId}`);
                if (cachedData) {
                    this.patchState({ players: cachedData, error: null });
                    return of(cachedData);
                }
                return this.swissUnihockeyService.getPlayersOfTeam(teamId).pipe(
                    tap({
                        next: (players: Player[]) => {
                            this.patchState({ players, error: null });
                            this.cacheService.setCache<Player[]>(`${this.localStorageKey}_${teamId}`, players);
                        },
                        error: error => this.patchState({ error })
                    })
                );
            })
        )
    );
}
