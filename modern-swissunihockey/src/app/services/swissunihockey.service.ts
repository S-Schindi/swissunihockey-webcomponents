import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from '../components/players/player';

@Injectable({
    providedIn: 'root'
})
export class SwissUnihockeyService {

    public headers = new HttpHeaders({
        'Accept-Language': 'de-DE'
    });

    private apiUrl = 'https://unihockey.swiss/api/teamapi/initplayersadminvc/?teamid=4497'; // Replace with the actual API URL

    constructor(private http: HttpClient) { }

    getData(): Observable<Player[]> {
        return this.http.get<Player[]>(`${this.apiUrl}`, { headers: this.headers });
    }
}
