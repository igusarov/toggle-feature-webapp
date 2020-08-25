import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FeatureToggleService} from '../services/feature-toggle.service';
import {Observable} from 'rxjs';
import {FeatureToggle} from '../models/models';
import {map, share} from 'rxjs/operators';

@Component({
  selector: 'app-feature-toggle-list-page',
  templateUrl: 'feature-toggle-list-page.component.html',
  styleUrls: ['feature-toggle-list-page.component.scss']
})
export class FeatureToggleListPageComponent implements OnInit {
  public openItems$: Observable<FeatureToggle[]>;
  public archiveItems$: Observable<FeatureToggle[]>;

  constructor(
    private router: Router,
    private featureToggleService: FeatureToggleService,
  ) {}

  public ngOnInit(): void {
    const allItems$: Observable<FeatureToggle[]> = this.featureToggleService.fetchAll().pipe(
      share()
    );
    this.openItems$ = allItems$.pipe(
      map((items: FeatureToggle[]) => items.filter((item: FeatureToggle) => !item.archive))
    );
    this.archiveItems$ = allItems$.pipe(
      map((items: FeatureToggle[]) => items.filter((item: FeatureToggle) => item.archive))
    );
  }

  public handleClickItem(item: any): void {
    this.router.navigate(['feature-toggles/', item.id]);
  }

  public handleClickCreateButton(): void {
    this.router.navigate(['feature-toggles/create']);
  }
}
