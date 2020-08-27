import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FeatureToggle} from '../models/models';

@Component({
  selector: 'app-feature-toggle-list',
  templateUrl: 'feature-toggle-list.component.html',
  styleUrls: ['feature-toggle-list.component.scss']
})
export class FeatureToggleListComponent {
  @Input() items: FeatureToggle[];
  @Output() clickItem = new EventEmitter<FeatureToggle>();
}
