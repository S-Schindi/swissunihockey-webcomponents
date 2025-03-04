import { AsyncPipe, CommonModule, NgFor } from '@angular/common';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { TeamStaffStore } from './team-staff.store';
import { Observable } from 'rxjs';
import { TeamStaff } from './team-staff';

@Component({
  selector: 'app-team-staff',
  imports: [AsyncPipe, NgFor, CommonModule],
  standalone: true,
  providers: [TeamStaffStore],
  template: `
    <ng-container *ngIf="teamStaff$ | async as teamStaff">
      <ng-container *ngIf="teamStaff.length > 0; else noTeamStaff">
        <div class="team-staff-wrapper">
          <ul class="profile-card-list">
            <li class="team-staff" *ngFor="let staff of teamStaff">
              <div class="profilePicture imageMaskTop" [ngStyle]="{'background-image': 'url(' + staff.ThumbnailURL + ')'}"></div>
              <div class="staff-name">{{ staff.FullName }}</div>
              <div>{{ staff.TeamStaffRoleName }}</div>
            </li>
          </ul>
        </div>
      </ng-container>
      <ng-template #noTeamStaff>
        <div class="no-team-staff"> Kein Staff gefunden oder es ist ein Fehler aufgetreten. 😕</div>
      </ng-template>
    </ng-container>
  `,
  styles: `
  ul {
    list-style-type: none;
    padding: 0;
  }
  .team-staff-wrapper{
    margin: auto;
  }
  .imageMaskTop {
    overflow: hidden;
    background-size: cover;
    background-position: center top;
  }
  .profile-card-list {
    display: flex;
    gap: 16px;
    margin-top: 16px;
    justify-content: center;
    flex-wrap: wrap;

    .team-staff:hover {
      transform: scale(1.05);
    }

    > .team-staff {
      transition: transform 0.3s ease;
      text-align: center;
      padding: 10px;
      background-color: #ffffff;
      border-radius: 4px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.12);
      transition: all 0.2scubic-bezier(0.25, 0.8, 0.25, 1);

      .staff-name {
          text-transform: uppercase;
          font-size: 16px;
          color: #000000;
          font-weight: bold;
      }

      .staff-role {
          font-size: 12px;
          color: #000000;
          font-weight: normal;
      }

      .profilePicture {
        margin: 16px auto 8px;
        width: 76px;
        height: 76px;
        border-radius: 38px;
        float: none;
      }
    }
  }
  `,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class TeamStaffComponent implements OnInit {
  @Input() teamId: string;

  teamStaff$: Observable<TeamStaff[]>;

  constructor(private teamStaffStore: TeamStaffStore) {
    this.teamStaff$ = this.teamStaffStore.teamStaff$;
  }

  ngOnInit() {
    this.teamStaffStore.loadTeamStaff({ teamId: this.teamId });
  }

}
