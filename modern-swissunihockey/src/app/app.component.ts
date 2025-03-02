import { ChangeDetectorRef, Component, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayersComponent } from './components/players/players.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PlayersComponent],
  template: `
      <app-players *ngIf="selectedComponent === 'players'"></app-players>
  `,
})
export class AppComponent implements OnInit {
  selectedComponent: string;

  constructor(private elementRef: ElementRef, private cdr: ChangeDetectorRef) {
    this.selectedComponent = this.elementRef.nativeElement.getAttribute('selectedComponent');
    console.log(this.selectedComponent);
  }

  ngOnInit(): void {
    this.cdr.detectChanges();
  }
}
