import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {Customer, FeatureToggle} from '../models/models';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {catchError, debounceTime, filter, switchMap} from 'rxjs/operators';
import {CustomerService} from '../services/customer.service';

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
    technicalName: ['', Validators.required],
    expiresOn: [null],
    description: [null],
  };
  @Output() submitForm: EventEmitter<FeatureToggle> = new EventEmitter<FeatureToggle>();
  @Input() public featureToggle: FeatureToggle;
  @ViewChild('addCustomerInput', {static: false}) addCustomerInput: ElementRef<HTMLInputElement>;
  public addCustomerControl: FormControl = new FormControl();
  public foundCustomers$: Observable<Customer[]>;
  public selectedCustomers: Customer[] = [];
  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public featureToggleForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
  ) {}

  ngOnInit() {
    this.featureToggleForm = this.formBuilder.group(this.controlsConfig);
    this.foundCustomers$ = this.addCustomerControl.valueChanges.pipe(
      filter((value: string) => Boolean(typeof value === 'string' && value.trim())),
      debounceTime(500),
      switchMap(value => this.customerService
        .fetchByNameStartsWith(value).pipe(
          catchError(() => of([]))
        )
      ),
    );
  }

  public handleSelectCustomer(customer: Customer) {
    if (customer) {
      const isAlreadyAdded = this.selectedCustomers.some((item: Customer) => item.id === customer.id);
      if (!isAlreadyAdded) {
        this.selectedCustomers = [
          ...this.selectedCustomers,
          customer,
        ];
      }
    }
    this.addCustomerInput.nativeElement.value = '';
    this.addCustomerControl.setValue(null);
  }

  public handleRemoveCustomer(customer: Customer) {
    this.selectedCustomers = this.selectedCustomers.filter((item) => item.id !== customer.id);
  }

  public handleSubmit() {
    this.submitForm.emit(
      this.prepareDataToSubmit()
    );
  }

  private prepareDataToSubmit(): FeatureToggle {
    const data =  {
      ...this.featureToggleForm.value,
      customers: this.selectedCustomers,
    };
    if (data.expiresOn && typeof data.expiresOn !== 'string') {
      data.expiresOn = `${data.expiresOn.utc().format('YYYY-MM-DD')}T00:00:00Z`;
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.featureToggle.currentValue) {
      this.featureToggleForm = this.formBuilder.group(this.controlsConfig);
      this.selectedCustomers = this.featureToggle.customers;
    }
  }
}
