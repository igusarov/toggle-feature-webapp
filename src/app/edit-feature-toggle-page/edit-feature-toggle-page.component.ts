import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {FeatureToggle} from '../models/models';
import {FeatureToggleService} from '../services/feature-toggle.service';
import {Location} from '@angular/common';
import {SpinnerService} from '../services/spinner.service';
import {AlertService} from '../services/alert.service';

@Component({
  selector: 'app-edit-feature-toggle-page',
  templateUrl: 'edit-feature-toggle-page.component.html',
})
export class EditFeatureTogglePageComponent implements OnInit {
  public featureToggle: FeatureToggle;
  public featureToggleId: number;
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
    this.featureToggleService.fetchById(this.featureToggleId).subscribe(
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
    this.featureToggleService.update(this.featureToggleId, data).subscribe(
      () => {
        this.location.back();
      },
      (e) => {
        this.spinnerService.hide();
        this.alertService.showError();
      });
  }
}
