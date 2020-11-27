import {Assessment} from "./assessment";
import {Comment} from "./Comment";

export class Review {
  uid: string;
  state: string;
  limitReviewDate: Date;
  comments: Comment[];
  assessment: Assessment;


  constructor(uid: string,
              state: string,
              limitReviewDate: Date,
              comments: Comment[],
              assessment: Assessment) {
    this.uid = uid;
    this.state = state;
    this.limitReviewDate = limitReviewDate;
    this.comments = comments;
    this.assessment = assessment;
  }
}
