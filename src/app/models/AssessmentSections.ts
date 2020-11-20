export class AssessmentData {
  dataCollectionProcedure: string;
  analysisDescription: string;
  statisticalMethods: boolean;
  statisticalMethodsDescription: string;
}

export class AssessmentProcedure {
  occurDate: string;
  occurLocal: string;
  occurDetail: string;
  occurTime: number;
  assessmentProcedureSteps: AssessmentProcedureStep[];
  isPilotAssessment: boolean;
  pilotDescription: string;
  questionsAllowed: boolean;
}

export class AssessmentThreat {
  assessmentToolsId: number;
  threats: string[];
  controlMeasure: string;
  limitations: string[];
  ethicalAspectsDefined: boolean;
  ethicalAspectsDescription: string;
  biasDescription: string;
}

export class SystemUser {
  uid: string;
  login: string;
  password: string;
  name: string;
  email: string;
  admin: boolean;
  isEnabled: boolean;
  isReviewer: boolean;
}

export class UsabilityGoal {
  assessmentId: number;
  attribute: string;
  goal: string;
}

export class SmartCityQuestionnaire {
  hasDataManagement: boolean;
  hasAppExecution: boolean;
  hasSensorNetwork: boolean;
  hasDataProcessing: boolean;
  hasDataAccess: boolean;
  hasServiceManagement: boolean;
  hasSoftwareTools: boolean;
  defineCityModel: boolean;
}

export class ScaleQuestion {
  scaleId: number;
  key: string;
  question: string;
  lowerScoreLabel: string;
  higherScoreLabel: string;
}

export class Scale {
  uid: string;
  acronym: string;
  name: string;
  description: string;
  measures: string[];
  scaleQuestions: ScaleQuestion[];
}

export class Variable {
  assessmentVariableId: number;
  usabilityAttribute: string;
  variableList: string[];
  obtainedBy: string;
  scale: Scale[];
}

export class ScaleQuestion2 {
  scaleId: number;
  key: string;
  question: string;
  lowerScoreLabel: string;
  higherScoreLabel: string;
}

export class Scale2 {
  uid: string;
  acronym: string;
  name: string;
  description: string;
  measures: string[];
  scaleQuestions: ScaleQuestion2[];
}

export class AttributeAssessmentVariables {
  variables: Variable[];
  scale: Scale2[];
}

export class Participant {
  participantsQuantity: number;
  participationLocalType: string;
  hasCompensation: boolean;
  compensationDescription: string;
  criteriaList: string[];
  hasCollectedInformation: boolean;
  collectedInformationUse: string;
  instructions: string;
  questions: string[];
}

export class Task {
  assessmentToolsId: number;
  description: string;
  taskExecutionTime: number;
  acceptanceCriteria: string;
}

export class AssessmentTools {
  tools: string[];
  toolsUsageDescription: string;
  tasks: Task[];
}

export class AssessmentProcedureStep {
  assessmentProcedureId: number;
  name: string;
  description: string;
}
