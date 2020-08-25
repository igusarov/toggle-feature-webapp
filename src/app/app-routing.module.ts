import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FeatureToggleListPageComponent} from './feature-toggle-list-page/feature-toggle-list-page.component';
import {CreateFeatureTogglePageComponent} from './create-feature-toggle-page/create-feature-toggle-page.component';
import {EditFeatureTogglePageComponent} from './edit-feature-toggle-page/edit-feature-toggle-page.component';


const routes: Routes = [
  { path: '', redirectTo: '/feature-toggles', pathMatch: 'full' },
  { path: 'feature-toggles', component: FeatureToggleListPageComponent },
  { path: 'feature-toggles/create', component: CreateFeatureTogglePageComponent },
  { path: 'feature-toggles/:id', component: EditFeatureTogglePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
