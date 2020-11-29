import {Component} from '@angular/core';

import {REVIEWER_MENU_ITEMS, USER_MENU_ITEMS} from './pages-menu';
import {Store} from "@ngrx/store";
import {AppState} from "../store";
import {selectUser} from "../store/modules/user/user.selectors";

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  menu: any;
  isReviewer: any;

  constructor(private store: Store<AppState>) {
    this.store.select(selectUser).subscribe(user => this.isReviewer = user.reviewer);
    if (this.isReviewer === true) {
      this.menu = REVIEWER_MENU_ITEMS;
    } else {
      this.menu = USER_MENU_ITEMS;
    }
  }


}
