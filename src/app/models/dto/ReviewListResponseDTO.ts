export class ReviewListResponseDTO {
  projectName:     string;
  limitReviewDate: Date;
  reviewStatus:    string;
  reviewUid: string;


  constructor(projectName: string, limitReviewDate: Date, reviewStatus: string, reviewUid: string) {
    this.projectName = projectName;
    this.limitReviewDate = limitReviewDate;
    this.reviewStatus = reviewStatus;
    this.reviewUid = reviewUid;
  }
}
