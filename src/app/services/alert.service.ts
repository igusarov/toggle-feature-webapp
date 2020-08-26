import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ErrorContentDialogComponent} from '../error-content-dialog/error-content-dialog.component';

@Injectable()
export class AlertService {
  constructor(
    private dialog: MatDialog
  ) {}
  public showError() {
    this.dialog.open(ErrorContentDialogComponent);
  }
}
