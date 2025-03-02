import { Component, OnInit } from '@angular/core';
import { AsyncPipe, JsonPipe, NgFor } from '@angular/common';
// import { SwissUnihockeyService } from '../../../services/swissunihockey.service';
import { Observable } from 'rxjs';
import { PlayersStore } from './players.store';
import { Player } from './player';

@Component({
  styleUrls: ['./players.component.css'],
  selector: 'app-players',
  standalone: true,
  imports: [AsyncPipe, NgFor],
  providers: [PlayersStore],
  template: `
    <table>
      <thead>
        <tr>
          <th class="photo-column">Photo</th>
          <th class="number-column">#</th>
          <th>Name</th>
          <th>Position</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let player of players$ | async">
          <td class="photo-column"><img [src]="player.ThumbnailURL" [alt]="player.FullName"></td>
          <td class="number-column">{{player.ShirtNumber}}</td>
          <td>{{player.FullName}}</td>
          <td>{{player.Position}}</td>
        </tr>
      </tbody>
    </table>
  `,
  styles: ``
})
export class PlayersComponent implements OnInit {
  players$: Observable<Player[]>;

  constructor(private playersStore: PlayersStore) {
    this.players$ = this.playersStore.players$;
  }

  ngOnInit() {
    this.playersStore.loadPlayers();
  }
}
