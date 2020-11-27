export class CollaboratorDTO {
  assessmentUid: string;
  userUid: string;
  collaboratorsEmail: string[];

  constructor(assessmentUid: string, userUid: string, collaboratorsEmail: string[]) {
    this.assessmentUid = assessmentUid;
    this.userUid = userUid;
    this.collaboratorsEmail = collaboratorsEmail;
  }
}
