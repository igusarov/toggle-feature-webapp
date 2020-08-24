import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-create-feature-toggle-page',
  templateUrl: 'create-feature-toggle-page.component.html',
  styleUrls: ['create-feature-toggle-page.component.scss']
})
export class CreateFeatureTogglePageComponent implements OnInit {
  public addCustomerControl: FormControl = new FormControl();
  public foundCustomers$: Observable<any>;
  public selectedCustomers: any[] = [];
  public separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('addCustomerInput', {static: false}) addCustomerInput: ElementRef<HTMLInputElement>;

  ngOnInit() {
    this.foundCustomers$ = this.addCustomerControl.valueChanges.pipe(
      map(value => this._filter(value))
    );
  }

  public handleSelectCustomer(customer: any) {
    console.log(customer);
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

  private _filter(value) {
    console.log(value);
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
}
