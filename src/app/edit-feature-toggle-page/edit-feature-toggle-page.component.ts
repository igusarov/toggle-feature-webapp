import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs';
import {FeatureToggle} from '../models/models';
import {FeatureToggleService} from '../services/feature-toggle.service';
import {Location} from '@angular/common';
import {SpinnerService} from '../services/spinner.service';
import {AlertService} from '../services/alert.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-edit-feature-toggle-page',
  templateUrl: 'edit-feature-toggle-page.component.html',
})
export class EditFeatureTogglePageComponent implements OnInit, OnDestroy {
  public featureToggle: FeatureToggle;
  public featureToggleId: number;
  private unsubscribe$: Subject<void> = new Subject();
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private featureToggleService: FeatureToggleService,
    private spinnerService: SpinnerService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.featureToggleId = this.route.snapshot.params.id;
    this.spinnerService.show();
    this.featureToggleService.fetchById(this.featureToggleId).pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(
      (data: FeatureToggle) => {
        this.featureToggle = data;
        this.spinnerService.hide();
      },
      () => {
        this.spinnerService.hide();
        this.alertService.showError();
      }
    );
  }

  public handleSubmit(data: FeatureToggle) {
    this.spinnerService.show();
    this.featureToggleService.update(this.featureToggleId, data).pipe(
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
