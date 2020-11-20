import {Injectable} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  constructor(private spinnerService: NgxSpinnerService) {
  }

  public showSpinner(): void {
    this.spinnerService.show();
  }

  public hideSpinner(): void {
    this.spinnerService.hide();
  }
}
