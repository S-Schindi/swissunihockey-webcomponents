import { Component, Input, ViewEncapsulation, OnInit } from '@angular/core';
import { RootTable } from './table';
import { Observable } from 'rxjs';
import { TableStore } from './table.store';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-table',
  imports: [AsyncPipe, NgFor, NgIf],
  standalone: true,
  providers: [TableStore],
  template: `
    <ng-container *ngIf="rootTable$ | async as rootTable">
        <ng-container *ngIf="rootTable.Rows.length > 0; else noRows">
          <div style="overflow-x:auto; min-width: 550px;">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Team</th>
                  <th *ngFor="let label of rootTable.TableHeader.ValueColumnLabels">{{ label.Label }}</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let row of rootTable.Rows; let i = index">
                  <td>{{ i + 1 }}</td>
                  <td class="center-content">
                    <img width="32px" height="32px" [src]="row.LogoUrl" alt="Logo" />
                    {{ row.Name }}
                  </td>
                  <td *ngFor="let vc of row.ValueColumns">{{ vc.Value }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </ng-container>
        <ng-template #noRows>
          <div class="no-rows"> Keine Daten gefunden oder es ist ein Fehler aufgetreten. 😕</div>
        </ng-template>
    </ng-container>
  `,
  styleUrls: ['./table.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class TableComponent implements OnInit {
  @Input() itemId: string;

  rootTable$: Observable<RootTable>;

  constructor(private tableStore: TableStore) {
    this.rootTable$ = this.tableStore.table$;
  }

  ngOnInit() {
    this.tableStore.loadTable({ itemId: this.itemId });
  }
}
