import {VuatConstants} from "./constants/vuat-constants";

export class PlanAnswers {
  planApplicationAnswers: PlanApplicationAnswers;
  planGoalsAnswers: PlanGoalsAnswers;
  planVariableAnswers: PlanVariableAnswers;
  planParticipantsAnswers: PlanParticipantsAnswers;
  planTasksAnswers: PlanTasksAnswers;
  planProcedureAnswers: PlanProcedureAnswers;
  planDataAnswers: PlanDataAnswers;
  planThreatsAnswers: PlanThreatsAnswers;

  constructor() {
    this.planApplicationAnswers = new PlanApplicationAnswers();
    this.planGoalsAnswers = new PlanGoalsAnswers();
    this.planVariableAnswers = new PlanVariableAnswers();
    this.planParticipantsAnswers = new PlanParticipantsAnswers();
    this.planTasksAnswers = new PlanTasksAnswers();
    this.planProcedureAnswers = new PlanProcedureAnswers();
    this.planDataAnswers = new PlanDataAnswers();
    this.planThreatsAnswers = new PlanThreatsAnswers();
  }
}

export class PlanApplicationAnswers {
  projectName: string;
  projectDescription: string;
  smartCityPercentage: string;
  dataManagement: string;
  applicationExecution: string;
  sensorNetwork: string;
  dataProcessing: string;
  dataAccess: string;
  serviceManagement: string;
  tools: string;
  definingCityModel: string;

  constructor() {
    this.projectName = VuatConstants.PLAN_ANSWER.pending.name;
    this.projectDescription = VuatConstants.PLAN_ANSWER.pending.name;
    this.smartCityPercentage = VuatConstants.PLAN_ANSWER.pending.name;
    this.dataManagement = VuatConstants.PLAN_ANSWER.pending.name;
    this.applicationExecution = VuatConstants.PLAN_ANSWER.pending.name;
    this.sensorNetwork = VuatConstants.PLAN_ANSWER.pending.name;
    this.dataProcessing = VuatConstants.PLAN_ANSWER.pending.name;
    this.dataAccess = VuatConstants.PLAN_ANSWER.pending.name;
    this.serviceManagement = VuatConstants.PLAN_ANSWER.pending.name;
    this.tools = VuatConstants.PLAN_ANSWER.pending.name;
    this.definingCityModel = VuatConstants.PLAN_ANSWER.pending.name;
  }
}

export class PlanDataAnswers {
  dataCollectionProcedure: string;
  dataCollectedAnalyzed: string;
  statisticalMethods: string;

  constructor() {
    this.dataCollectionProcedure = VuatConstants.PLAN_ANSWER.pending.name;
    this.dataCollectedAnalyzed = VuatConstants.PLAN_ANSWER.pending.name;
    this.statisticalMethods = VuatConstants.PLAN_ANSWER.pending.name;
  }
}

export class PlanGoalsAnswers {
  learnability: string;
  efficiency: string;
  userRetentionOverTime: string;
  errorRate: string;
  satisfaction: string;

  constructor() {
    this.learnability = VuatConstants.PLAN_ANSWER.pending.name;
    this.efficiency = VuatConstants.PLAN_ANSWER.pending.name;
    this.userRetentionOverTime = VuatConstants.PLAN_ANSWER.pending.name;
    this.errorRate = VuatConstants.PLAN_ANSWER.pending.name;
    this.satisfaction = VuatConstants.PLAN_ANSWER.pending.name;
  }
}

export class PlanParticipantsAnswers {
  howManyParticipants: string;
  participationType: string;
  formCompensation: string;
  eligibilityCriteria: string;
  demographicQuestionnaire: string;
  participantsInstruction: string;
  askedQuestions: string;

  constructor() {
    this.howManyParticipants = VuatConstants.PLAN_ANSWER.pending.name;
    this.participationType = VuatConstants.PLAN_ANSWER.pending.name;
    this.formCompensation = VuatConstants.PLAN_ANSWER.pending.name;
    this.eligibilityCriteria = VuatConstants.PLAN_ANSWER.pending.name;
    this.demographicQuestionnaire = VuatConstants.PLAN_ANSWER.pending.name;
    this.participantsInstruction = VuatConstants.PLAN_ANSWER.pending.name;
    this.askedQuestions = VuatConstants.PLAN_ANSWER.pending.name;
  }
}

export class PlanProcedureAnswers {
  whenOccur: string;
  whereOccur: string;
  howOccur: string;
  howMuchTime: string;

  constructor() {
    this.whenOccur = VuatConstants.PLAN_ANSWER.pending.name;
    this.whereOccur = VuatConstants.PLAN_ANSWER.pending.name;
    this.howOccur = VuatConstants.PLAN_ANSWER.pending.name;
    this.howMuchTime = VuatConstants.PLAN_ANSWER.pending.name;
  }
}

export class PlanTasksAnswers {
  usedTools: string;
  tasksToPerform: string;
  tasksTime: string;
  criteria: string;

  constructor() {
    this.usedTools = VuatConstants.PLAN_ANSWER.pending.name;
    this.tasksToPerform = VuatConstants.PLAN_ANSWER.pending.name;
    this.tasksTime = VuatConstants.PLAN_ANSWER.pending.name;
    this.criteria = VuatConstants.PLAN_ANSWER.pending.name;
  }
}

export class PlanThreatsAnswers {
  whatThreats: string;
  threatsValidityControlled: string;
  assessmentLimitations: string;
  ethicalAspects: string;
  assessmentBiases: string;

  constructor() {
    this.whatThreats = VuatConstants.PLAN_ANSWER.pending.name;
    this.threatsValidityControlled = VuatConstants.PLAN_ANSWER.pending.name;
    this.assessmentLimitations = VuatConstants.PLAN_ANSWER.pending.name;
    this.ethicalAspects = VuatConstants.PLAN_ANSWER.pending.name;
    this.assessmentBiases = VuatConstants.PLAN_ANSWER.pending.name;
  }
}

export class PlanVariableAnswers {
  learnabilityAtt: string;
  efficiencyAtt: string;
  userRetentionOverTimeAtt: string;
  errorRateAtt: string;
  satisfactionAtt: string;
  learnabilityMeth: string;
  efficiencyMeth: string;
  userRetentionOverTimeMeth: string;
  errorRateMeth: string;
  satisfactionMeth: string;
  suggestedScales: string;

  constructor() {
    this.learnabilityAtt = VuatConstants.PLAN_ANSWER.pending.name;
    this.efficiencyAtt = VuatConstants.PLAN_ANSWER.pending.name;
    this.userRetentionOverTimeAtt = VuatConstants.PLAN_ANSWER.pending.name;
    this.errorRateAtt = VuatConstants.PLAN_ANSWER.pending.name;
    this.satisfactionAtt = VuatConstants.PLAN_ANSWER.pending.name;
    this.learnabilityMeth = VuatConstants.PLAN_ANSWER.pending.name;
    this.efficiencyMeth = VuatConstants.PLAN_ANSWER.pending.name;
    this.userRetentionOverTimeMeth = VuatConstants.PLAN_ANSWER.pending.name;
    this.errorRateMeth = VuatConstants.PLAN_ANSWER.pending.name;
    this.satisfactionMeth = VuatConstants.PLAN_ANSWER.pending.name;
    this.suggestedScales = VuatConstants.PLAN_ANSWER.pending.name;
  }
}
