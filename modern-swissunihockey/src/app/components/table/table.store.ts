import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { SwissUnihockeyService } from '../../services/swissunihockey.service';
import { of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { CacheService } from '../../services/cache.service';
import { RootTable } from './table';

export interface TableState {
    tableRoot: RootTable;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any;
}

@Injectable()
export class TableStore extends ComponentStore<TableState> {
    private readonly localStorageKey = 'tablesCache';

    constructor(private swissUnihockeyService: SwissUnihockeyService, public cacheService: CacheService) {
        super({ tableRoot: null, error: null });
    }

    readonly table$ = this.select(state => state.tableRoot);
    readonly error$ = this.select(state => state.error);

    readonly loadTable = this.effect<{ itemId: string }>(trigger$ =>
        trigger$.pipe(
            switchMap(({ itemId }) => {
                const cachedData = this.cacheService.getCache<RootTable>(`${this.localStorageKey}_${itemId}`);;
                if (cachedData) {
                    this.patchState({ tableRoot: cachedData, error: null });
                    return of(cachedData);
                }
                return this.swissUnihockeyService.getTable(itemId).pipe(
                    tap({
                        next: (tableRoot: RootTable) => {
                            this.patchState({ tableRoot, error: null });
                            this.cacheService.setCache<RootTable>(`${this.localStorageKey}_${itemId}`, tableRoot);
                        },
                        error: error => this.patchState({ error })
                    })
                );
            })
        )
    );
}
