import {Comment} from "../Comment";

export class FinishReviewDTO {
  reviewUid: string;
  comments:  Comment[];


  constructor(reviewUid: string, comments: Comment[]) {
    this.reviewUid = reviewUid;
    this.comments = comments;
  }
}
