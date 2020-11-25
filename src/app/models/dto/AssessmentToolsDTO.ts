import {PlanTasksAnswers} from "../assessment-answers";

export class AssessmentToolsDTO {
  assessmentUid: string;
  tools: string[];
  toolsUsageDescription: string;
  taskDTOS: TaskDTO[];
  planTasksAnswers: PlanTasksAnswers;

  constructor(assessmentUid: string,
              tools: string[],
              toolsUsageDescription: string,
              taskDTOS: TaskDTO[],
              planTasksAnswers: PlanTasksAnswers) {
    this.assessmentUid = assessmentUid;
    this.tools = tools;
    this.toolsUsageDescription = toolsUsageDescription;
    this.taskDTOS = taskDTOS;
    this.planTasksAnswers = planTasksAnswers;
  }
}

export class TaskDTO {
  description: string;
  taskExecutionTime: number;
  acceptanceCriteria: string;

  constructor(description: string,
              taskExecutionTime: number,
              acceptanceCriteria: string) {
    this.description = description;
    this.taskExecutionTime = taskExecutionTime;
    this.acceptanceCriteria = acceptanceCriteria;
  }
}
