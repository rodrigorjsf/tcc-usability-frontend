export class AssessmentTransferDTO {
  private assessmentUid: string;
  private projectName: string;

  constructor(assessmentUid: string,
              projectName: string) {
    this.assessmentUid = assessmentUid;
    this.projectName = projectName;
  }
}
