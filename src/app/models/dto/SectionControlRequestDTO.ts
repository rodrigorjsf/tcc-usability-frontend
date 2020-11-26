export class SectionControlRequestDTO {
  assessmentUid: string;
  sectionEnum: string;

  constructor(assessmentUid: string, sectionEnum: string) {
    this.assessmentUid = assessmentUid;
    this.sectionEnum = sectionEnum;
  }
}

