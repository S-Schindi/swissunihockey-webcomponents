import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { AsyncPipe, CommonModule, JsonPipe, NgFor } from '@angular/common';
import { Observable } from 'rxjs';
import { PlayersStore } from './players.store';
import { Player } from './player';

@Component({
  styleUrls: ['./players.component.css'],
  selector: 'app-players',
  standalone: true,
  imports: [AsyncPipe, NgFor, CommonModule],
  providers: [PlayersStore],
  template: `
    <ng-container *ngIf="players$ | async as players">
      <ng-container *ngIf="players.length > 0; else noPlayers">
        <table>
          <thead>
            <tr>
              <th class="photo-column"></th>
              <th class="number-column">#</th>
              <th>Name</th>
              <th>Position</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let player of players">
              <td class="photo-column"><img [src]="player.ThumbnailURL" [alt]="player.FullName"></td>
              <td class="number-column">{{player.ShirtNumber}}</td>
              <td>{{player.FullName}}</td>
              <td>{{player.Position}}</td>
            </tr>
          </tbody>
        </table>
      </ng-container>
      <ng-template #noPlayers>
        <div class="no-players"> Keine Spieler gefunden oder es ist ein Fehler aufgetreten. 😕</div>
      </ng-template>
    </ng-container>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class PlayersComponent implements OnInit {
  @Input() teamId: string;

  players$: Observable<Player[]>;

  constructor(private playersStore: PlayersStore) {
    this.players$ = this.playersStore.players$;
  }

  ngOnInit() {
    this.playersStore.loadPlayers({ teamId: this.teamId });
  }
}
