import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FeatureToggleService} from '../services/feature-toggle.service';
import {FeatureToggle} from '../models/models';
import {SpinnerService} from '../services/spinner.service';
import {AlertService} from '../services/alert.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-feature-toggle-list-page',
  templateUrl: 'feature-toggle-list-page.component.html',
  styleUrls: ['feature-toggle-list-page.component.scss'],
})
export class FeatureToggleListPageComponent implements OnInit, OnDestroy {
  public openItems: FeatureToggle[] = [];
  public archiveItems: FeatureToggle[] = [];
  private unsubscribe$: Subject<void> = new Subject();
  constructor(
    private router: Router,
    private featureToggleService: FeatureToggleService,
    private spinnerService: SpinnerService,
    private alertService: AlertService
  ) {}

  public ngOnInit(): void {
    this.spinnerService.show();
    this.featureToggleService.fetchAll().pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe((items) => {
        this.openItems = items.filter((item: FeatureToggle) => !item.archive);
        this.archiveItems = items.filter((item: FeatureToggle) => item.archive);
        this.spinnerService.hide();
      }, () => {
        this.spinnerService.hide();
        this.alertService.showError();
      });
  }

  public handleClickItem(item: FeatureToggle): void {
    this.router.navigate(['feature-toggles/', item.id]);
  }

  public handleClickCreateButton(): void {
    this.router.navigate(['feature-toggles/create']);
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
