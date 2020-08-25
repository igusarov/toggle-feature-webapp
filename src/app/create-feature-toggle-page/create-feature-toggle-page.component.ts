import {Component} from '@angular/core';
import {FeatureToggle} from '../models/models';
import {FeatureToggleService} from '../services/feature-toggle.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-create-feature-toggle-page',
  templateUrl: 'create-feature-toggle-page.component.html',
})
export class CreateFeatureTogglePageComponent {
  constructor(
    private featureToggleService: FeatureToggleService,
    private location: Location,
  ) {}
  public handleSubmit(data: FeatureToggle) {
    this.featureToggleService.create(data).subscribe(
      () => {
      this.location.back();
    },
      (e) => {
      console.error(e);
    });
  }
}
