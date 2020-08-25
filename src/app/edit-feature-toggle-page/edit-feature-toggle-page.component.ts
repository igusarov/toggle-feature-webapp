import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {FeatureToggle} from '../models/models';
import {FeatureToggleService} from '../services/feature-toggle.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-edit-feature-toggle-page',
  templateUrl: 'edit-feature-toggle-page.component.html',
})
export class EditFeatureTogglePageComponent implements OnInit {
  public featureToggle$: Observable<FeatureToggle>;
  public featureToggleId: number;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private featureToggleService: FeatureToggleService,
  ) {}

  ngOnInit(): void {
    this.featureToggleId = this.route.snapshot.params.id;
    this.featureToggle$ = this.featureToggleService.fetchById(this.featureToggleId);
  }

  public handleSubmit(data: FeatureToggle) {
    this.featureToggleService.update(this.featureToggleId, data).subscribe(
      () => {
        this.location.back();
      },
      (e) => {
        console.error(e);
      });
  }
}
