import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideComponentStore } from '@ngrx/component-store';
import { AppComponent } from './app/app.component';
import { AppStore } from './app/app.state';

document.addEventListener('DOMContentLoaded', () => {
  bootstrapApplication(AppComponent, {
    providers: [
      provideHttpClient(),
      provideComponentStore(AppStore),
    ]
  }).catch(err => console.error(err));
});
