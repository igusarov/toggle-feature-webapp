import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FeatureToggle} from '../models/models';
import {featureToggleEndpoint} from '../constants/constants';

@Injectable()
export class FeatureToggleService {
  constructor(
    private http: HttpClient
  ) {}

  public fetchAll(): Observable<FeatureToggle[]> {
    return this.http.get<FeatureToggle[]>(featureToggleEndpoint);
  }

  public fetchById(id: number): Observable<FeatureToggle> {
    return this.http.get<FeatureToggle>(`${featureToggleEndpoint}/${id}`);
  }

  public create(data: FeatureToggle): Observable<any> {
    return this.http.post<any>(featureToggleEndpoint, data);
  }

  public update(id: number, data: FeatureToggle): Observable<any> {
    return this.http.put<any>(`${featureToggleEndpoint}/${id}`, data);
  }
}
