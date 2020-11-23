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
  Variable,
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
  variables: Variable[];
  scale: Scale[];

  constructor() {
  }
}


