import {PlanDataAnswers} from "../assessment-answers";

export class AssessmentDataDTO {
  assessmentUid: string;
  dataCollectionProcedure: string;
  analysisDescription: string;
  statisticalMethods: boolean;
  statisticalMethodsDescription: string;
  planDataAnswers: PlanDataAnswers;


  constructor(assessmentUid: string,
              dataCollectionProcedure: string,
              analysisDescription: string,
              statisticalMethods: boolean,
              statisticalMethodsDescription: string,
              planDataAnswers: PlanDataAnswers) {
    this.assessmentUid = assessmentUid;
    this.dataCollectionProcedure = dataCollectionProcedure;
    this.analysisDescription = analysisDescription;
    this.statisticalMethods = statisticalMethods;
    this.statisticalMethodsDescription = statisticalMethodsDescription;
    this.planDataAnswers = planDataAnswers;
  }
}
