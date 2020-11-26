export class SectionUpdateRequestDTO {
  assessmentUid: string;
  userUid:       string;
  sectionEnum:   string;


  constructor(assessmentUid: string, userUid: string, sectionEnum: string) {
    this.assessmentUid = assessmentUid;
    this.userUid = userUid;
    this.sectionEnum = sectionEnum;
  }
}
