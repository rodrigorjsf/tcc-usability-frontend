import { Component, OnInit } from '@angular/core';
import {NbDialogRef} from "@nebular/theme";

@Component({
  selector: 'ngx-dialog-data-review',
  templateUrl: './dialog-data-review.component.html',
  styleUrls: ['./dialog-data-review.component.scss']
})
export class DialogDataReviewComponent {

  reviewDate: Date;
  constructor(protected ref: NbDialogRef<DialogDataReviewComponent>) {}

  cancel() {
    this.ref.close();
  }

  submit() {
    this.ref.close(this.reviewDate);
  }

  get isValid() {
    return !(this.reviewDate === null || this.reviewDate === undefined);
  }

}
