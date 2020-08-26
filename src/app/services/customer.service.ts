import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Customer} from '../models/models';
import {customerEndpoint} from '../constants/constants';

@Injectable()
export class CustomerService {
  constructor(
    private http: HttpClient
  ) {}

  public fetchByNameStartsWith(query: string): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${customerEndpoint}?startsWith=${query}`);
  }
}
