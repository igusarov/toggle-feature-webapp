import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-feature-toggle-list-page',
  templateUrl: 'feature-toggle-list-page.component.html',
  styleUrls: ['feature-toggle-list-page.component.scss']
})
export class FeatureToggleListPageComponent {
  public openItems: any = [
    {
      id: 1,
      displayName: 'SOme feature name trolololoo',
    },
    {
      id: 1,
      displayName: 'SOme feature name trolololoo',
    },
    {
      id: 1,
      displayName: 'SOme feature name trolololoo',
    },
    {
      id: 1,
      displayName: 'SOme feature name trolololoo',
    }
  ];
  public archiveItems: any = [
    {
      id: 1,
      displayName: 'SOme feature name trolololoo 2433',
    },
    {
      id: 2,
      displayName: 'SOme feature 23424 name trolololoo',
    },
    {
      id: 2,
      displayName: 'SOme feature  2332423 name trolololoo',
    },
    {
      id: 4,
      displayName: 'SOme feature 24234 name trolololoo',
    }
  ];

  constructor(
    private router: Router,
  ) {}

  public handleClickItem(item: any): void {
    this.router.navigate(['feature-toggles/', item.id]);
  }

  public handleClickCreateButton(): void {
    this.router.navigate(['feature-toggles/create']);
  }
}
