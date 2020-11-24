import {PlanVariableAnswers} from "../assessment-answers";

export class AssessmentVariablesDTO {
  assessmentUid: string;
  variables: VariableDTO[];
  scale: string[];
  planVariableAnswers: PlanVariableAnswers;

  constructor(assessmentUid: string) {
    this.assessmentUid = assessmentUid;
    this.variables = [];
    this.scale = null;
    this.planVariableAnswers = new PlanVariableAnswers();
  }
}

export class VariableDTO {
  usabilityAttribute: string;
  variables: string;
  obtainedBy: string;

  constructor(usabilityAttribute: string,
              variables: string,
              obtainedBy: string) {
    this.usabilityAttribute = usabilityAttribute;
    this.variables = variables;
    this.obtainedBy = obtainedBy;
  }
}
