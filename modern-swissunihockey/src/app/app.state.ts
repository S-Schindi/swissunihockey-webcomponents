import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

interface AppState {
    exampleData: string;
}

@Injectable()
export class AppStore extends ComponentStore<AppState> {
    constructor() {
        super({ exampleData: '' }); // ✅ Initial state
    }
}
