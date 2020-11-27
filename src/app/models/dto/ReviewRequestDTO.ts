export class ReviewRequestDTO {
  assessmentUid: string;
  dateLimit:     Date;


  constructor(assessmentUid: string, dateLimit: Date) {
    this.assessmentUid = assessmentUid;
    this.dateLimit = dateLimit;
  }
}

