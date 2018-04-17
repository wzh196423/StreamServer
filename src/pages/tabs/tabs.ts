import { Component } from '@angular/core';

import { LiveTabPage } from '../live/live-tab.component';
import { ManagementTabPage } from '../management/management-tab.component';
import { HomeTabPage } from '../home/home-tab.component';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = LiveTabPage;
  tab2Root = ManagementTabPage;
  tab3Root = HomeTabPage;

  constructor() {

  }
}
