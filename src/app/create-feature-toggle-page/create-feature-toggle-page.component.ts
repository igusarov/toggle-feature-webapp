import {Component} from '@angular/core';
import {FeatureToggle} from '../models/models';
import {FeatureToggleService} from '../services/feature-toggle.service';
import {Location} from '@angular/common';
import {SpinnerService} from '../services/spinner.service';
import {AlertService} from '../services/alert.service';

@Component({
  selector: 'app-create-feature-toggle-page',
  templateUrl: 'create-feature-toggle-page.component.html',
})
export class CreateFeatureTogglePageComponent {
  constructor(
    private featureToggleService: FeatureToggleService,
    private location: Location,
    private spinnerService: SpinnerService,
    private alertService: AlertService
  ) {}
  public handleSubmit(data: FeatureToggle) {
    this.spinnerService.show();
    this.featureToggleService.create(data).subscribe(
      () => {
      this.location.back();
    },
      (e) => {
        this.spinnerService.hide();
        this.alertService.showError();
        console.error(e);
    });
  }
}
