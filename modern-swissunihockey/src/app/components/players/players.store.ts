import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { SwissUnihockeyService } from '../../services/swissunihockey.service';
import { of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Player } from './player';

export interface PlayersState {
    players: Player[];
    error: any;
}

@Injectable()
export class PlayersStore extends ComponentStore<PlayersState> {
    private readonly localStorageKey = 'playersCache';
    private readonly cacheDuration = 10 * 60 * 1000; // 10 minutes in milliseconds

    constructor(private swissUnihockeyService: SwissUnihockeyService) {
        super({ players: [], error: null });
        this.loadCachedPlayers();
    }

    readonly players$ = this.select(state => state.players);
    readonly error$ = this.select(state => state.error);

    readonly loadPlayers = this.effect<void>(trigger$ =>
        trigger$.pipe(
            switchMap(() => {
                const cachedData = localStorage.getItem(this.localStorageKey);
                if (cachedData) {
                    const { players, timestamp } = JSON.parse(cachedData);
                    const now = new Date().getTime();
                    if (now - timestamp < this.cacheDuration) {
                        this.patchState({ players });
                        return of(players);
                    } else {
                        localStorage.removeItem(this.localStorageKey);
                    }
                }
                return this.swissUnihockeyService.getData().pipe(
                    tap({
                        next: (players: Player[]) => {
                            this.patchState({ players, error: null });
                            this.cachePlayers(players);
                        },
                        error: error => this.patchState({ error })
                    })
                );
            })
        )
    );

    private loadCachedPlayers() {
        const cachedData = localStorage.getItem(this.localStorageKey);
        if (cachedData) {
            const { players, timestamp } = JSON.parse(cachedData);
            const now = new Date().getTime();
            if (now - timestamp < this.cacheDuration) {
                this.patchState({ players });
            } else {
                localStorage.removeItem(this.localStorageKey);
            }
        }
    }

    private cachePlayers(players: Player[]) {
        const timestamp = new Date().getTime();
        localStorage.setItem(this.localStorageKey, JSON.stringify({ players, timestamp }));
    }

    clearCache() {
        localStorage.removeItem(this.localStorageKey);
        this.patchState({ players: [] });
    }
}
