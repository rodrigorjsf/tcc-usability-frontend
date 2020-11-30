export class TableTransferDTO {
  assessmentUid: string;
  projectName: string;
  authorName: string;
  state: string;

  constructor(assessmentUid: string) {
    this.assessmentUid = assessmentUid;
  }
}
