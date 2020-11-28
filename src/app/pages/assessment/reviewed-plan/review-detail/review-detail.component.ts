import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ToastService} from "../../../../services/toastService";
import {VuatConstants} from "../../../../models/constants/vuat-constants";
import {ReviewService} from "../../../../@core/auth/services/review.service";
import {NbToastrService} from "@nebular/theme";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../store";
import {selectUser} from "../../../../store/modules/user/user.selectors";
import {Review} from "../../../../models/Review";

@Component({
  selector: 'ngx-review-detail',
  templateUrl: './review-detail.component.html',
  styleUrls: ['./review-detail.component.scss']
})
export class ReviewDetailComponent implements OnInit {

  review: Review;
  router: Router;
  reviewInfo: any;
  dataloaded: Promise<boolean>;
  planPercentage: number;
  user: any;
  toast: ToastService;
  private categories = VuatConstants.CATEGORIES;

  constructor(private reviewService: ReviewService,
              router: Router,
              private toastrService: NbToastrService,
              private store: Store<AppState>) {
    this.toast = new ToastService(toastrService);
    this.router = router;
    this.store.select(selectUser).subscribe(user => this.user = user);
    this.reviewInfo = this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit() {
    this.reviewService.findReviewByUid(this.reviewInfo.reviewUid)
      .subscribe(data => {
        this.review = data;
        this.dataloaded = Promise.resolve(true);
      });
  }

  back() {
    this.router.navigate(['/pages/assessment/reviewed-plan']);
  }
}
