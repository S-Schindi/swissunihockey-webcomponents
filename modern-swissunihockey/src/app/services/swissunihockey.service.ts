import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from '../components/players/player';
import { RootTable } from '../components/table/table';
import { Game } from '../components/games/game';
import { TeamStaff } from '../components/team-staff/team-staff';

@Injectable({
    providedIn: 'root'
})
export class SwissUnihockeyService {

    public headers = new HttpHeaders({
        'Accept-Language': 'de-DE'
    });

    private apiUrl = 'https://unihockey.swiss';

    constructor(private http: HttpClient) { }

    getPlayersOfTeam(teamId: string): Observable<Player[]> {
        return this.http.get<Player[]>(`${this.apiUrl}/api/teamapi/initplayersadminvc/?teamid=${teamId}`, { headers: this.headers });
    }

    getTable(itemId: string): Observable<RootTable> {
        return this.http.get<RootTable>(`${this.apiUrl}/api/statisticstableapi/initstatisticstable/?itemid=${itemId}&tabletype=5`, { headers: this.headers });
    }

    getPreviousGames(teamId: string): Observable<Game[]> {
        return this.http.get<Game[]>(`${this.apiUrl}/api/teamapi/getpreviousteamgames/?teamid=${teamId}&lastgameid=0`, { headers: this.headers });
    }

    getComingGames(teamId: string): Observable<Game[]> {
        return this.http.get<Game[]>(`${this.apiUrl}/api/teamapi/getcomingteamgames/?teamid=${teamId}&lastgameid=0`, { headers: this.headers });
    }

    getComingClubGames(teamId: string): Observable<Game[]> {
        return this.http.get<Game[]>(`${this.apiUrl}/api/clubapi/getcomingclubgames/?clubid=${teamId}&lastgameid=0`, { headers: this.headers });
    }

    getTeamStaff(teamId: string): Observable<TeamStaff[]> {
        return this.http.get<TeamStaff[]>(`${this.apiUrl}/api/teamapi/initteamstaffadminvc/?teamid=${teamId}`, { headers: this.headers });
    }
}

