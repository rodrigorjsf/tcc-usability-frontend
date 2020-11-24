import {PlanAnswers, PlanApplicationAnswers} from "../assessment-answers";

export class SmartCityQuestionnaireDTO {
  assessmentUid: string;
  hasDataManagement: boolean;
  hasAppExecution: boolean;
  hasSensorNetwork: boolean;
  hasDataProcessing: boolean;
  hasDataAccess: boolean;
  hasServiceManagement: boolean;
  hasSoftwareTools: boolean;
  defineCityModel: boolean;
  planApplicationAnswers: PlanApplicationAnswers;

  constructor(uid: string) {
    this.assessmentUid = uid;
    this.hasDataManagement = null;
    this.hasAppExecution = null;
    this.hasSensorNetwork = null;
    this.hasDataProcessing = null;
    this.hasDataAccess = null;
    this.hasServiceManagement = null;
    this.hasSoftwareTools = null;
    this.defineCityModel = null;
    this.planApplicationAnswers = new PlanApplicationAnswers();
  }
}
