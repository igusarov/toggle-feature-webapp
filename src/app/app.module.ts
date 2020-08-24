import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FeatureToggleListPageComponent} from './feature-toggle-list-page/feature-toggle-list-page.component';
import {
  MatAutocompleteModule,
  MatButtonModule, MatChipsModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule, MatSlideToggleModule,
  MatTabsModule
} from '@angular/material';
import {FeatureToggleListComponent} from './feature-toggle-list/feature-toggle-list.component';
import {CreateFeatureTogglePageComponent} from './create-feature-toggle-page/create-feature-toggle-page.component';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FeatureToggleListPageComponent,
    FeatureToggleListComponent,
    CreateFeatureTogglePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
