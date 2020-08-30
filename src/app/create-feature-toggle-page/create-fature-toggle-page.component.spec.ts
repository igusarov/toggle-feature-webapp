import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CreateFeatureTogglePageComponent} from './create-feature-toggle-page.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {FeatureToggleService} from '../services/feature-toggle.service';
import {Location} from '@angular/common';
import {SpinnerService} from '../services/spinner.service';
import {AlertService} from '../services/alert.service';
import {FeatureToggle} from '../models/models';
import {of, Subject} from 'rxjs';

describe('CreateFeatureTogglePageComponent', () => {
  let fixture: ComponentFixture<CreateFeatureTogglePageComponent>;
  let spinnerServiceMock: SpinnerService;
  let featureToggleServiceMock: FeatureToggleService;
  let locationMock: Location;
  let alertServiceMock: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        CreateFeatureTogglePageComponent
      ],
      providers: [{
        provide: FeatureToggleService,
        useValue: {
          create: () => of(),
        }
      }, {
        provide: Location,
        useValue: {
          back: () => {}
        }
      },
      {
        provide: SpinnerService,
        useValue: {
          show: () => {},
          hide: () => {}
        }
      }, {
        provide: AlertService,
        useValue: {
          showError: () => {},
        }
      }],
      schemas: [NO_ERRORS_SCHEMA],
    });
    spinnerServiceMock = TestBed.get(SpinnerService);
    featureToggleServiceMock = TestBed.get(FeatureToggleService);
    locationMock = TestBed.get(Location);
    alertServiceMock = TestBed.get(AlertService);
    fixture = TestBed.createComponent(CreateFeatureTogglePageComponent);
  });

  describe('handleSubmit', () => {
    it('should show spinner before send data', () => {
        const callOrder = [];
        spyOn(spinnerServiceMock, 'show').and.callFake(() => {
          callOrder.push('firstCall');
        });
        spyOn(featureToggleServiceMock, 'create').and.callFake(() => {
          callOrder.push('secondCall');
          return of();
        });

        fixture.componentInstance.handleSubmit({} as FeatureToggle);

        expect(callOrder.length).toBe(2);
        expect(callOrder[0]).toBe('firstCall');
        expect(callOrder[1]).toBe('secondCall');
    });

    it('should redirect back after successfull submit', () => {
      const sub$ = new Subject<void>();
      spyOn(featureToggleServiceMock, 'create').and.callFake(() => sub$);
      spyOn(locationMock, 'back').and.callThrough();

      fixture.componentInstance.handleSubmit({} as FeatureToggle);
      sub$.next();
      sub$.complete();

      expect(locationMock.back).toHaveBeenCalled();
    });

    it('should hide spinner on error submit', () => {
      const sub$ = new Subject<void>();
      spyOn(featureToggleServiceMock, 'create').and.callFake(() => sub$);
      spyOn(spinnerServiceMock, 'hide').and.callThrough();

      fixture.componentInstance.handleSubmit({} as FeatureToggle);
      sub$.error(undefined);

      expect(spinnerServiceMock.hide).toHaveBeenCalled();
    });

    it('should show error message', () => {
      const sub$ = new Subject<void>();
      spyOn(featureToggleServiceMock, 'create').and.callFake(() => sub$);
      spyOn(alertServiceMock, 'showError').and.callThrough();

      fixture.componentInstance.handleSubmit({} as FeatureToggle);
      sub$.error(undefined);

      expect(alertServiceMock.showError).toHaveBeenCalled();
    });
  });
});
