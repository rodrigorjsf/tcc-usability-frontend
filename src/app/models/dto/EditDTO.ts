export class EditDTO {
  assessmentUid: string;
  projectName: string;
  authorName: string;
  profile: string;
  state: string;


  constructor(assessmentUid: string, projectName: string, authorName: string, profile: string, state: string) {
    this.assessmentUid = assessmentUid;
    this.projectName = projectName;
    this.authorName = authorName;
    this.profile = profile;
    this.state = state;
  }
}
