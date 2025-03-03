import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { SwissUnihockeyService } from '../../services/swissunihockey.service';
import { switchMap, tap } from 'rxjs/operators';
import { CacheService } from '../../services/cache.service';
import { of } from 'rxjs/internal/observable/of';
import { TeamStaff } from './team-staff';

export interface TeamStaffState {
    teamStaff: TeamStaff[];
    error: any;
}

@Injectable()
export class TeamStaffStore extends ComponentStore<TeamStaffState> {
    private readonly localStorageKey = 'teamStaffCache';

    constructor(private swissUnihockeyService: SwissUnihockeyService, public cacheService: CacheService) {
        super({ teamStaff: [], error: null });
    }

    readonly teamStaff$ = this.select(state => state.teamStaff);
    readonly error$ = this.select(state => state.error);

    readonly loadTeamStaff = this.effect<{ teamId: string }>(trigger$ =>
        trigger$.pipe(
            switchMap(({ teamId }) => {
                const cachedData = this.cacheService.getCache<TeamStaff[]>(`${this.localStorageKey}_${teamId}`);
                if (cachedData) {
                    this.patchState({ teamStaff: cachedData, error: null });
                    return of(cachedData);
                }
                return this.swissUnihockeyService.getTeamStaff(teamId).pipe(
                    tap({
                        next: (teamStaff: TeamStaff[]) => {
                            this.patchState({ teamStaff, error: null });
                            this.cacheService.setCache<TeamStaff[]>(`${this.localStorageKey}_${teamId}`, teamStaff);
                        },
                        error: error => this.patchState({ error })
                    })
                );
            })
        )
    );
}
