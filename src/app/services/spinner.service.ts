import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class SpinnerService {
  private isShown$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public show() {
    this.isShown$.next(true);
  }
  public hide() {
    this.isShown$.next(false);
  }
}
