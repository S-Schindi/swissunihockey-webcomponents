import { Component, Input } from '@angular/core';
import { Game } from './game';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';

@Component({
    selector: 'app-games',
    imports: [AsyncPipe, CommonModule],
    providers: [],
    template: `
    <ng-container *ngIf="games | async as games">
        <ng-container *ngIf="games.length > 0; else noGames">
            <div class="games-table">
                <ul>
                    <li *ngFor="let game of games">
                        <div class="gameListItem materialCardView clickable">
                            <a [href]="getLeagueLink(game)" target="_blank">
                                <div class="leagueContainer clickable">
                                <span class="league-name">{{ game.LeagueName }}</span>
                                </div>
                            </a>
                            <div class="game-header list-item" (click)="openGameDetails(game)">
                                <div class="arena">{{game.ArenaName}}</div>
                                <div class="team-container">
                                    <div class="team-logo-and-name home-team">
                                        <div class="logo small imageMaskContain" [ngStyle]="{'background-image': 'url(' + game.HomeTeamClubLogoURL + ')'}"></div>
                                        <div class="team-name-container">
                                            <span class="team-text">{{game.HomeTeamClubName}}</span>
                                            <span class="team-sub-text">{{game.HomeTeamTeamName}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="result-container">
                                    <!-- TODO: Implement different views based on game.status -->
                                    <div class="resultPlate">
                                        <span *ngIf="game.GameStatusID !== 1">{{game.HomeTeamScore}}-{{game.AwayTeamScore}}</span>
                                        <span *ngIf="game.GameStatusID === 1">{{getTimestamp(game.GameTime) | date:'HH:mm'}}</span>
                                    </div>
                                    <div class="gameTimeContainer">
                                        <span>{{getTimestamp(game.GameTime) | date}}</span>
                                    </div>
                                    <div *ngIf="game.GameStatusID === 3 && game.FinalResultTypeID === 0" class="gameTimeContainer">
                                        <span>{{getTimestamp(game.GameTime) | date:'HH:mm'}}</span>
                                    </div>
                                    <div *ngIf="game.FinalResultTypeID !== 0 && game.GameStatusID === 3" class="result-type-container">
                                        <span>{{getGameStatus(game)}}</span>
                                    </div>
                                    <div *ngIf="game.GameStatusID === 2"  class="live-container">
                                        <span>LIVE</span>             
                                    </div>
                                </div>  
                                <div class="team-container">
                                    <div class="team-logo-and-name away-team">
                                        <div class="logo small imageMaskContain" [ngStyle]="{'background-image': 'url(' + game.AwayTeamClubLogoURL + ')'}"></div>
                                        <div class="team-name-container">
                                            <span class="team-text">{{game.AwayTeamClubName}}</span>
                                            <span class="team-sub-text">{{game.AwayTeamTeamName}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </ng-container>
        <ng-template #noGames>
            <div class="no-games">Keine Spiele gefunden oder ein Fehler ist aufgetreten. 😕</div>
        </ng-template>
    </ng-container>
  `,
    styleUrls: ['./games.component.css']
})
export class GamesComponent {
    @Input() games: Observable<Game[]>;

    getTimestamp(rawDate: string): number {
        const match = rawDate.match(/\d+/); // Extract digits
        return match ? parseInt(match[0], 10) : 0;
    }

    getLeagueLink(game: Game): string {
        const url = `https://unihockey.swiss/LeagueOrganizer/Magazine/1#/leaguesite/${game.LeagueID}`;
        return url;
    }

    openGameDetails(game: Game) {
        const url = `https://unihockey.swiss/LeagueOrganizer/Magazine/1#/magazinegameview/${game.GameID}`;
        window.open(url, "_blank");
    }

    getGameStatus(game: Game): string {
        switch (game.FinalResultTypeID) {
            case 1:
                return 'Overtime';
            case 2:
                return 'Pen. shots';

        }
    }
}
