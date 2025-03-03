import { Component, Input } from '@angular/core';
import { GamesStore } from './game.store';
import { Game } from './game';
import { Observable } from 'rxjs';
import { GamesComponent } from './games.component';

@Component({
  selector: 'app-upcoming-games',
  imports: [GamesComponent],
  standalone: true,
  providers: [GamesStore],
  template: `
    <p>
      <app-games [games]="upcomingGames$"></app-games>
    </p>
  `,
  styles: ``
})
export class UpcomingGamesComponent {
  @Input() teamId: string;

  upcomingGames$: Observable<Game[]>;

  constructor(private gameStore: GamesStore) {
    this.upcomingGames$ = this.gameStore.upcomingGames$;
  }

  ngOnInit() {
    this.gameStore.loadUpcomingGames({ teamId: this.teamId });
  }
}
