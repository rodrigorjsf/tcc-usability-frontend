import {
  AssessmentData,
  AssessmentProcedure,
  AssessmentThreat,
  AssessmentTools,
  Participant,
  Scale,
  SmartCityQuestionnaire,
  SystemUser,
  UsabilityGoal,
  Attribute,
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
  participant: Participant;
  assessmentTools: AssessmentTools;
  assessmentProcedure: AssessmentProcedure;
  assessmentData: AssessmentData;
  assessmentThreat: AssessmentThreat;
  answers: PlanAnswers;
  attributes: Attribute[];
  scale: Scale[];
  userProfile: string;

  constructor() {
  }
}


