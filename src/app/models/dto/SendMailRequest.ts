export class SendMailRequest {
  assessmentUid: string;
  emails: string[];

  constructor(assessmentUid: string, emails: string[]) {
    this.assessmentUid = assessmentUid;
    this.emails = emails;
  }
}
