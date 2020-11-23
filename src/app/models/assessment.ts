import {
  AssessmentData,
  AssessmentProcedure,
  AssessmentThreat,
  AssessmentTools,
  AttributeAssessmentVariables,
  Participant,
  SmartCityQuestionnaire,
  SystemUser,
  UsabilityGoal,
} from './AssessmentSections';
import {PlanAnswers} from "./assessment-answers";

export class Assessment {
  uid: string;
  systemUser: SystemUser;
  projectName: string;
  projectDescription: string;
  usabilityGoals: UsabilityGoal[];
  isSmartCity: boolean;
  smartCityPercentage: number;
  smartCityQuestionnaire: SmartCityQuestionnaire;
  attributeAssessmentVariables: AttributeAssessmentVariables;
  participant: Participant;
  assessmentTools: AssessmentTools;
  assessmentProcedure: AssessmentProcedure;
  assessmentData: AssessmentData;
  assessmentThreat: AssessmentThreat;
  answers: PlanAnswers;

  constructor() {
  }
}


