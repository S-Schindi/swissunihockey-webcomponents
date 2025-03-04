import { Component, Input, ViewEncapsulation, OnInit } from '@angular/core';
import { GamesStore } from './game.store';
import { Game } from './game';
import { Observable } from 'rxjs';
import { GamesComponent } from './games.component';

@Component({
  selector: 'app-previous-games',
  imports: [GamesComponent],
  standalone: true,
  providers: [GamesStore],
  template: `
    <p>
      <app-games [games]="previousGames$"></app-games>
    </p>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class PreviousGamesComponent implements OnInit {
  @Input() teamId: string;

  previousGames$: Observable<Game[]>;

  constructor(private gameStore: GamesStore) {
    this.previousGames$ = this.gameStore.previousGames$;
  }

  ngOnInit() {
    this.gameStore.loadPreviousGames({ teamId: this.teamId });
  }
}
