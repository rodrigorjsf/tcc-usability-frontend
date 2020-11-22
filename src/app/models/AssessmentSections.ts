export class AssessmentData {
  dataCollectionProcedure: string;
  analysisDescription: string;
  statisticalMethods: boolean;
  statisticalMethodsDescription: string;

  constructor() {
  }
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

  constructor() {
  }
}

export class AssessmentThreat {
  assessmentToolsId: number;
  threats: string[];
  controlMeasure: string;
  limitations: string[];
  ethicalAspectsDefined: boolean;
  ethicalAspectsDescription: string;
  biasDescription: string;

  constructor() {
  }
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

  constructor() {
  }
}

export class UsabilityGoal {
  assessmentId: number;
  attribute: string;
  goal: string;

  constructor() {
  }
}

export class SmartCityQuestionnaire {
  public hasDataManagement: boolean;
  public hasAppExecution: boolean;
  public hasSensorNetwork: boolean;
  public hasDataProcessing: boolean;
  public hasDataAccess: boolean;
  public hasServiceManagement: boolean;
  public hasSoftwareTools: boolean;
  public defineCityModel: boolean;

  constructor() {
  }

  getValueList(): boolean[] {
    return [this.hasDataManagement, this.hasAppExecution, this.hasSensorNetwork, this.hasDataProcessing,
      this.hasDataAccess, this.hasServiceManagement, this.hasSoftwareTools, this.defineCityModel];
  }
}

export class ScaleQuestion {
  scaleId: number;
  key: string;
  question: string;
  lowerScoreLabel: string;
  higherScoreLabel: string;

  constructor() {
  }
}

export class Scale {
  uid: string;
  acronym: string;
  name: string;
  description: string;
  measures: string[];
  scaleQuestions: ScaleQuestion[];

  constructor() {
  }
}

export class Variable {
  assessmentVariableId: number;
  usabilityAttribute: string;
  variableList: string[];
  obtainedBy: string;
  scale: Scale[];

  constructor() {
  }
}

export class ScaleQuestion2 {
  scaleId: number;
  key: string;
  question: string;
  lowerScoreLabel: string;
  higherScoreLabel: string;

  constructor() {
  }
}

export class Scale2 {
  uid: string;
  acronym: string;
  name: string;
  description: string;
  measures: string[];
  scaleQuestions: ScaleQuestion2[];

  constructor() {
  }
}

export class AttributeAssessmentVariables {
  variables: Variable[];
  scale: Scale2[];

  constructor() {
  }
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

  constructor() {
  }
}

export class Task {
  assessmentToolsId: number;
  description: string;
  taskExecutionTime: number;
  acceptanceCriteria: string;

  constructor() {
  }
}

export class AssessmentTools {
  tools: string[];
  toolsUsageDescription: string;
  tasks: Task[];

  constructor() {
  }
}

export class AssessmentProcedureStep {
  assessmentProcedureId: number;
  name: string;
  description: string;

  constructor() {
  }
}
