export class BeginReviewDTO {
  reviewUid: string;
  userUid:   string;


  constructor(reviewUid: string, userUid: string) {
    this.reviewUid = reviewUid;
    this.userUid = userUid;
  }
}
