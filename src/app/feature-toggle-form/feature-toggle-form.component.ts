import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {FeatureToggle} from '../models/models';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-feature-toggle-form',
  templateUrl: 'feature-toggle-form.component.html',
  styleUrls: ['feature-toggle-form.component.scss']
})
export class FeatureToggleFormComponent implements OnInit, OnChanges {
  private static readonly defaultControlsConfig = {
    archive: [false],
    inverted: [false],
    displayName: [null],
    technicalName: [''],
    expiresOn: [''],
    description: [''],
  };
  @Output() submitForm: EventEmitter<FeatureToggle> = new EventEmitter<FeatureToggle>();
  @Input() public featureToggle: FeatureToggle;
  public addCustomerControl: FormControl = new FormControl();
  public foundCustomers$: Observable<any>;
  public selectedCustomers: any[] = [];
  public separatorKeysCodes: number[] = [ENTER, COMMA];
  @ViewChild('addCustomerInput', {static: false}) addCustomerInput: ElementRef<HTMLInputElement>;
  public featureToggleForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.featureToggleForm = this.formBuilder.group(this.controlsConfig);
    this.foundCustomers$ = this.addCustomerControl.valueChanges.pipe(
      map(value => this._filter(value))
    );
  }

  public handleSelectCustomer(customer: any) {
    if (customer) {
      this.selectedCustomers = [
        ...this.selectedCustomers,
        customer,
      ];
    }
    this.addCustomerInput.nativeElement.value = '';
    this.addCustomerControl.setValue(null);
  }

  public handleRemoveCustomer(customer: any) {
    this.selectedCustomers = this.selectedCustomers.filter((item) => item.id !== customer.id);
  }

  public handleSubmit() {
    this.submitForm.emit(
      this.prepareDataToSubmit()
    );
  }

  private prepareDataToSubmit() {
    const data =  {
      ...this.featureToggleForm.value,
      customers: this.selectedCustomers,
    };
    if (data.expiresOn && typeof data.expiresOn !== 'string') {
      data.expiresOn = data.expiresOn.utc().format();
    }
    return data;
  }

  private get controlsConfig(): any {
    const defaultConfig = FeatureToggleFormComponent.defaultControlsConfig;
    if (this.featureToggle) {
      return Object.entries(defaultConfig).reduce((acc, [key, value]: [string, any[]]) => {
        const val = [...value];
        val[0] = this.featureToggle[key];
        return {
          ...acc,
          [key]: val,
        };
      }, {});
    }
    return defaultConfig;
  }

  private _filter(value) {
    return [
      {
        id: 12,
        displayName: 'Ilya Gusarov'
      },
      {
        id: 23,
        displayName: 'Ivan Ivanov'
      }
    ];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.featureToggle.currentValue) {
      this.featureToggleForm = this.formBuilder.group(this.controlsConfig);
      this.selectedCustomers = this.featureToggle.customers;
    }
  }
}
