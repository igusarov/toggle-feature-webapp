import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FeatureToggleFormComponent} from './feature-toggle-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ElementRef, NO_ERRORS_SCHEMA} from '@angular/core';
import {MatAutocompleteModule, MatSlideToggleModule} from '@angular/material';
import {CustomerService} from '../services/customer.service';
import {Customer, FeatureToggle} from '../models/models';
import omit from 'lodash/omit';

describe('FeatureToggleFormComponent', () => {
  let fixture: ComponentFixture<FeatureToggleFormComponent>;
  let component: FeatureToggleFormComponent;
  const featureToggleMockData: FeatureToggle = {
    displayName: 'test',
    technicalName: 'test',
    expiresOn: null,
    description: 'test',
    archive: false,
    inverted: false,
    customers: []
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatSlideToggleModule
      ],
      declarations: [
        FeatureToggleFormComponent,
      ],
      providers: [
        {
          provide: CustomerService,
          value: {},
        }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(FeatureToggleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('featureToggleForm', () => {
      it('should be invalid when technicalName is empty', () => {
        component.featureToggleForm.setValue(omit(featureToggleMockData, ['customers']));
        component.featureToggleForm.patchValue({technicalName: ''});
        expect(component.featureToggleForm.valid).toBeFalsy();
      });
  });

  describe('handleSelectCustomer', () => {
    beforeEach(() => {
      component.addCustomerInput = {nativeElement: {value: ''}} as ElementRef;
    });

    it('should add customer', () => {
      const customer: Customer = {id: 1, displayName: 'test'};
      component.handleSelectCustomer(customer);
      expect(component.selectedCustomers.length).toBe(1);
      expect(component.selectedCustomers[0]).toBe(customer);
    });

    it('should add the same customer only once', () => {
      const customer: Customer = {id: 1, displayName: 'test'};
      component.handleSelectCustomer(customer);
      component.handleSelectCustomer(customer);
      component.handleSelectCustomer(customer);
      expect(component.selectedCustomers.length).toBe(1);
    });
  });

  describe('handleRemoveCustomer', () => {
    it('should remove customer', () => {
      component.selectedCustomers.push({id: 1, displayName: 'test'});
      component.handleRemoveCustomer({id: 1, displayName: 'test'});
      expect(component.selectedCustomers.length).toBe(0);
    });
  });

  describe('handleSubmit', () => {
    it('should emit submitForm with proper data', (done: DoneFn) => {
        component.featureToggleForm.setValue(omit(featureToggleMockData, ['customers']));
        component.submitForm.subscribe((data) => {
          expect(data).toEqual(featureToggleMockData);
          done();
        });
        component.handleSubmit();
    });
  });
});
