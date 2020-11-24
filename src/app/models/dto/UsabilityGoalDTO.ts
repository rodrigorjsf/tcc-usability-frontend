export class UsabilityGoalDTO {
  assessmentUid: string;
  goals: Goal[];
  planGoalsAnswers: PlanGoalsAnswers;

  constructor(uid: string) {
    this.assessmentUid = uid;
    this.goals = [];
    this.planGoalsAnswers = null;
  }
}

export class Goal {
  attribute: string;
  goal: string;

  constructor(attribute: string,
              goal: string) {
    this.attribute = attribute;
    this.goal = goal;
  }
}

export class PlanGoalsAnswers {
  learnability: string;
  efficiency: string;
  userRetentionOverTime: string;
  errorRate: string;
  satisfaction: string;

  constructor() {
    this.learnability = null;
    this.efficiency = null;
    this.userRetentionOverTime = null;
    this.errorRate = null;
    this.satisfaction = null;
  }
}
