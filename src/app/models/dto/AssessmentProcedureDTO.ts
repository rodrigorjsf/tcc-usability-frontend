import {PlanProcedureAnswers} from "../assessment-answers";

export class AssessmentProcedureDTO {
  assessmentUid: string;
  occurDate: string;
  occurLocal: string;
  occurDetail: string;
  occurTime: number;
  assessmentProcedureStepDTOS: AssessmentProcedureStepDTO[];
  isPilotAssessment: boolean;
  pilotDescription: string;
  questionsAllowed: boolean;
  planProcedureAnswers: PlanProcedureAnswers;

  constructor(assessmentUid: string,
              occurDate: string,
              occurLocal: string,
              occurDetail: string,
              occurTime: number,
              assessmentProcedureStepDTOS: AssessmentProcedureStepDTO[],
              isPilotAssessment: boolean,
              pilotDescription: string,
              questionsAllowed: boolean,
              planProcedureAnswers: PlanProcedureAnswers) {
    this.assessmentUid = assessmentUid;
    this.occurDate = occurDate;
    this.occurLocal = occurLocal;
    this.occurDetail = occurDetail;
    this.occurTime = occurTime;
    this.assessmentProcedureStepDTOS = assessmentProcedureStepDTOS;
    this.isPilotAssessment = isPilotAssessment;
    this.pilotDescription = pilotDescription;
    this.questionsAllowed = questionsAllowed;
    this.planProcedureAnswers = planProcedureAnswers;
  }
}

export class AssessmentProcedureStepDTO {
  name: string;
  description: string;

  constructor(name: string,
              description: string) {
    this.name = name;
    this.description = description;
  }
}
