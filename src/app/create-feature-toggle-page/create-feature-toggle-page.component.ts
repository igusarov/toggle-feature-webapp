import {Component, OnDestroy} from '@angular/core';
import {FeatureToggle} from '../models/models';
import {FeatureToggleService} from '../services/feature-toggle.service';
import {Location} from '@angular/common';
import {SpinnerService} from '../services/spinner.service';
import {AlertService} from '../services/alert.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-create-feature-toggle-page',
  templateUrl: 'create-feature-toggle-page.component.html',
})
export class CreateFeatureTogglePageComponent implements OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();
  constructor(
    private featureToggleService: FeatureToggleService,
    private location: Location,
    private spinnerService: SpinnerService,
    private alertService: AlertService
  ) {}
  public handleSubmit(data: FeatureToggle) {
    this.spinnerService.show();
    this.featureToggleService.create(data).pipe(
     takeUntil(this.unsubscribe$),
    ).subscribe(
        () => {
          this.location.back();
        },
      (e) => {
        this.spinnerService.hide();
        this.alertService.showError();
        console.error(e);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
