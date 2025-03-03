import { createCustomElement } from '@angular/elements';
import { provideHttpClient } from '@angular/common/http';
import { PlayersComponent } from './app/components/players/players.component';

import { createApplication } from '@angular/platform-browser';
import { TableComponent } from './app/components/table/table.component';
import { PreviousGamesComponent } from './app/components/games/previous-games.component';
import { UpcomingGamesComponent } from './app/components/games/upcoming-games.component';
import { TeamStaffComponent } from './app/components/team-staff/team-staff.component';

(async () => {

  const app = await createApplication({
    providers: [
      provideHttpClient(),
    ],
  });

  const playerElement = createCustomElement(PlayersComponent, { injector: app.injector });
  customElements.define('uniho-players', playerElement);

  const tableElement = createCustomElement(TableComponent, { injector: app.injector });
  customElements.define('uniho-table', tableElement);

  const previousGamesElement = createCustomElement(PreviousGamesComponent, { injector: app.injector });
  customElements.define('uniho-previous-games', previousGamesElement);

  const upcomingGamesElement = createCustomElement(UpcomingGamesComponent, { injector: app.injector });
  customElements.define('uniho-upcoming-games', upcomingGamesElement);

  const teamStaffElement = createCustomElement(TeamStaffComponent, { injector: app.injector });
  customElements.define('uniho-team-staff', teamStaffElement);
})();
