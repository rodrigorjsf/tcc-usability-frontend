import {Component, Input} from '@angular/core';
import {NbDialogRef, NbToastrService} from "@nebular/theme";
import {FinishReviewDTO} from "../../../models/dto/FinishReviewDTO";
import {ReviewService} from "../../../@core/auth/services/review.service";
import {ToastService} from "../../../services/toastService";
import {Router} from "@angular/router";
import {VuatConstants} from "../../../models/constants/vuat-constants";

@Component({
  selector: 'ngx-finish-review-dialog',
  templateUrl: './finish-review-dialog.component.html',
  styleUrls: ['./finish-review-dialog.component.scss'],
})
export class FinishReviewDialogComponent {

  @Input() finishReview: FinishReviewDTO;
  toast: ToastService;
  router: Router;
  categories = VuatConstants.CATEGORIES;

  constructor(protected ref: NbDialogRef<FinishReviewDialogComponent>,
              private reviewService: ReviewService,
              router: Router,
              private toastrService: NbToastrService) {
    this.toast = new ToastService(toastrService);
    this.router = router;
  }

  dismiss() {
    this.ref.close();
  }

  async onFinish() {
    (await this.reviewService.finishReview(this.finishReview))
      .subscribe(data => {
          this.toast.showToastr('top-right', 'success', 'Review completed successfully.');
          this.router.navigate(['/pages/review-request']);
        },
        () => {
          this.toast.showToastr('top-right', 'danger', 'Error when finalizing the review.');
        });
    this.ref.close();
  }
}
