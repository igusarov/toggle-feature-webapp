import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-feature-toggle-list',
  templateUrl: 'feature-toggle-list.component.html'
})
export class FeatureToggleListComponent {
  @Input() items: any;
  @Output() clickItem = new EventEmitter();
}
