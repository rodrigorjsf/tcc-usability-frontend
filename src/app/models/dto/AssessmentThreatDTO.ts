import {PlanThreatsAnswers} from "../assessment-answers";

export class AssessmentThreatDTO {
  assessmentUid: string;
  threats: string[];
  controlMeasure: string;
  limitations: string[];
  ethicalAspectsDefined: boolean;
  ethicalAspectsDescription: string;
  biasDescription: string;
  planThreatsAnswers: PlanThreatsAnswers;


  constructor(assessmentUid: string,
              threats: string[],
              controlMeasure: string,
              limitations: string[],
              ethicalAspectsDefined: boolean,
              ethicalAspectsDescription: string,
              biasDescription: string,
              planThreatsAnswers: PlanThreatsAnswers) {
    this.assessmentUid = assessmentUid;
    this.threats = threats;
    this.controlMeasure = controlMeasure;
    this.limitations = limitations;
    this.ethicalAspectsDefined = ethicalAspectsDefined;
    this.ethicalAspectsDescription = ethicalAspectsDescription;
    this.biasDescription = biasDescription;
    this.planThreatsAnswers = planThreatsAnswers;
  }
}
