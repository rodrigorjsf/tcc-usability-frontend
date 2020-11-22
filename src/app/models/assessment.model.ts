export class CreateAssessmentFormModel {
  userUid: string;
  projectName: string;
  projectDescription: string;
  collaboratorsEmail: {email: string}[];
}


export class CreateAssessmentRequestModel {
  userUid: string;
  projectName: string;
  projectDescription: string;
  collaboratorsEmail: string[];
}
