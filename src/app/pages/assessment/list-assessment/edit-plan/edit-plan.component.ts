import {Component, OnInit} from '@angular/core';
import {Assessment} from '../../../../models/assessment';
import {AssessmentService} from '../../../../@core/auth/services/assessment.service';
import {Router} from '@angular/router';
import {QuestionService} from '../../../../@core/auth/services/question.service';
import {VuatConstants} from '../../../../models/constants/vuat-constants';
import {
  AttributeAssessmentVariables,
  Scale,
  SmartCityQuestionnaire,
  UsabilityGoal
} from "../../../../models/AssessmentSections";
import {PlanAnswers} from "../../../../models/assessment-answers";

@Component({
  selector: 'ngx-edit-plan',
  templateUrl: './edit-plan.component.html',
  styleUrls: ['./edit-plan.component.scss'],
})
export class EditPlanComponent implements OnInit {

  formEditable = false;
  assessment: Assessment;
  router: Router;
  isVald = false;
  planInfo: any;
  dataloaded: Promise<boolean>;
  questionsAnswered = 0;
  questionsPercentage: number;
  data: any;
  usabilityScales: Scale[];
  tooltipTrigger: string;
  private readonly instrumentQuestions = VuatConstants.PLAN_QUESTIONS;
  private readonly planAnswersConstants = VuatConstants.PLAN_ANSWER;
  smartCityQuestionnaire: SmartCityQuestionnaire;
  categories: any = {
    application: {acronym: 'AP'},
    goals: {acronym: 'GO'},
    variables: {acronym: 'VM'},
    participants: {acronym: 'PA'},
    tasks: {acronym: 'TM'},
    procedure: {acronym: 'PR'},
    data: {acronym: 'DT'},
    threats: {acronym: 'TH'},
  };

  smartCityCategories: any = {
    dataManagement: {acronym: 'DMN'},
    applicationExecutionEnvironment: {acronym: 'AEE'},
    sensorNetworkManagement: {acronym: 'SNM'},
    dataProcessing: {acronym: 'DPR'},
    dataAccess: {acronym: 'DTA'},
    serviceManagement: {acronym: 'SMN'},
    toolsforSoftwareDevelopment: {acronym: 'TSD'},
    definingACityModel: {acronym: 'DCM'},
  };
  selectOptions: any = {
    dataManagement: [
      {value: true, label: 'YES'},
      {value: false, label: 'NO', checked: true},
    ],
    applicationExecutionEnvironment: [
      {value: true, label: 'YES'},
      {value: false, label: 'NO', checked: true},
    ],
    sensorNetworkManagement: [
      {value: true, label: 'YES'},
      {value: false, label: 'NO', checked: true},
    ],
    dataProcessing: [
      {value: true, label: 'YES'},
      {value: false, label: 'NO', checked: true},
    ],
    dataAccess: [
      {value: true, label: 'YES'},
      {value: false, label: 'NO', checked: true},
    ],
    serviceManagement: [
      {value: true, label: 'YES'},
      {value: false, label: 'NO', checked: true},
    ],
    toolsforSoftwareDevelopment: [
      {value: true, label: 'YES'},
      {value: false, label: 'NO', checked: true},
    ],
    definingACityModel: [
      {value: true, label: 'YES'},
      {value: false, label: 'NO', checked: true},
    ],
  };

  constructor(private assessmentService: AssessmentService,
              private questionService: QuestionService,
              router: Router) {
    this.router = router;
    this.planInfo = this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit() {
    this.assessment = new Assessment();
    this.assessmentService.getAssessmentByUid(this.planInfo.assessmentUid)
      .subscribe(data => {
        this.data = data;
        this.assessment = data;
        this.initQuestionnaire();
        this.initGoals();
        this.initAnswers();
        this.initAssessmentAttribute();
        console.log(this.assessment);
        this.dataloaded = Promise.resolve(true);
      });
  }

  getApplicationAcronym() {
    return this.categories.application.acronym;
  }

  initQuestionnaire() {
    if (this.isNullOrUndefined(this.assessment.smartCityQuestionnaire))
      this.assessment.smartCityQuestionnaire = new SmartCityQuestionnaire(null, null,
        null, null, null, null, null, null);
  }

  initGoals() {
    if (this.isNullOrUndefined(this.assessment.usabilityGoals) || this.assessment.usabilityGoals.length === 0)
      this.assessment.usabilityGoals = [new UsabilityGoal('LRN'), new UsabilityGoal('EFF'),
        new UsabilityGoal('USR'), new UsabilityGoal('ERR'), new UsabilityGoal('STF')];
  }

  initAssessmentAttribute() {
    if (this.isNullOrUndefined(this.assessment.attributeAssessmentVariables)) {
      this.assessment.attributeAssessmentVariables = new AttributeAssessmentVariables();
      this.assessment.attributeAssessmentVariables.scale = [];
    }
  }

  initAnswers() {
    if (this.isNullOrUndefined(this.assessment.answers))
      this.assessment.answers = new PlanAnswers();
  }

  getCharacterizationQuestionsObject(key: string): any {
    return this.instrumentQuestions.find(item => item['key'] === key);
  }

  onClickApplication(section: string) {
    if (this.assessment.smartCityQuestionnaire === null || this.assessment.smartCityQuestionnaire === undefined) {
      this.assessment.smartCityQuestionnaire = new SmartCityQuestionnaire(null, null,
        null, null, null, null, null, null);
    }
    this.calculateProgressPercentage(section);
    if (section === this.categories.variables.acronym) {
      this.getUsabilityScales();
    }
  }

  getUsabilityScales() {
    this.assessmentService.getScaleList()
      .subscribe(scaleData => {
        this.usabilityScales = scaleData;
        console.log(this.usabilityScales);
      });
  }

  isNullOrUndefined(object: any): boolean {
    return object === null || object === undefined;
  }

  isNull(object: any): boolean {
    return object === null;
  }

  isEqual(var1: any, var2: any): boolean {
    return var1 === var2;
  }

  booleanToString(bool: boolean): string {
    if (bool === true) {
      return 'YES';
    }
    return 'NO';
  }

  setSmartCityAnswerField(option: boolean, objKey: string) {
    if (this.smartCityCategories.dataManagement.acronym === objKey) {
      this.assessment.smartCityQuestionnaire.hasDataManagement = option;
    } else if (this.smartCityCategories.applicationExecutionEnvironment.acronym === objKey) {
      this.assessment.smartCityQuestionnaire.hasAppExecution = option;
    } else if (this.smartCityCategories.sensorNetworkManagement.acronym === objKey) {
      this.assessment.smartCityQuestionnaire.hasSensorNetwork = option;
    } else if (this.smartCityCategories.dataProcessing.acronym === objKey) {
      this.assessment.smartCityQuestionnaire.hasDataProcessing = option;
    } else if (this.smartCityCategories.dataAccess.acronym === objKey) {
      this.assessment.smartCityQuestionnaire.hasDataAccess = option;
    } else if (this.smartCityCategories.serviceManagement.acronym === objKey) {
      this.assessment.smartCityQuestionnaire.hasServiceManagement = option;
    } else if (this.smartCityCategories.toolsforSoftwareDevelopment.acronym === objKey) {
      this.assessment.smartCityQuestionnaire.hasSoftwareTools = option;
    } else {
      this.assessment.smartCityQuestionnaire.defineCityModel = option;
    }
  }

  isFirstQuestion(obj: string): boolean {
    return obj === 'AP-PN' || obj === 'AP-PD';
  }

  isDataManagement(obj: string): boolean {
    return obj === this.smartCityCategories.dataManagement.acronym;
  }

  getPercentageColor(): string {
    if (this.questionsPercentage <= 25)
      return 'danger';
    else if (this.questionsPercentage > 40 && this.questionsPercentage <= 70)
      return 'warning';
    else if (this.questionsPercentage > 70 && this.questionsPercentage <= 99)
      return 'primary';
    else
      return 'success';
  }


  calculateProgressPercentage(section: string) {
    this.questionsPercentage = 0;
    this.questionsAnswered = 0;
    let questionQuantity;
    if (this.categories.application.acronym === section) {
      questionQuantity = 11;
      if (this.assessment.answers.planApplicationAnswers.projectName === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planApplicationAnswers.projectDescription === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planApplicationAnswers.applicationExecution ===
        this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planApplicationAnswers.dataAccess === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planApplicationAnswers.dataManagement === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planApplicationAnswers.dataProcessing === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planApplicationAnswers.definingCityModel === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planApplicationAnswers.sensorNetwork === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planApplicationAnswers.serviceManagement === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planApplicationAnswers.smartCityPercentage ===
        this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planApplicationAnswers.tools === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
    } else if (this.categories.goals.acronym === section) {
      questionQuantity = 5;
      if (this.assessment.answers.planGoalsAnswers.learnability === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planGoalsAnswers.satisfaction === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planGoalsAnswers.errorRate === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planGoalsAnswers.userRetentionOverTime === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planGoalsAnswers.efficiency === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
    } else if (this.categories.variables.acronym === section) {
      questionQuantity = 11;
      if (this.assessment.answers.planVariableAnswers.learnabilityAtt === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planVariableAnswers.satisfactionAtt === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planVariableAnswers.errorRateAtt === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planVariableAnswers.userRetentionOverTimeAtt === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planVariableAnswers.efficiencyAtt === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planVariableAnswers.satisfactionMeth === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planVariableAnswers.errorRateMeth === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planVariableAnswers.userRetentionOverTimeMeth === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planVariableAnswers.efficiencyMeth === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planVariableAnswers.learnabilityMeth === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planVariableAnswers.suggestedScales === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
    }
    const calculatedPercentage = +((this.questionsAnswered * 100) / questionQuantity).toFixed(1);
    this.questionsPercentage = calculatedPercentage > 100 ? 100 : calculatedPercentage;
  }

  calculateGoalsPercentage() {
    this.questionsPercentage = 0;
    this.questionsAnswered = 0;
    const questionQuantity = 11;
    if (!this.isNullOrUndefined(this.assessment.projectName))
      this.questionsAnswered = this.questionsAnswered + 1;
    if (!this.isNullOrUndefined(this.assessment.projectDescription))
      this.questionsAnswered = this.questionsAnswered + 1;
    if (!this.isNull(this.assessment.smartCityPercentage))
      this.questionsAnswered = this.questionsAnswered + 1;
    for (const questionnaire in this.assessment.smartCityQuestionnaire) {
      if (!this.isNullOrUndefined(questionnaire))
        this.questionsAnswered = this.questionsAnswered + 1;
    }
    const calculatedPercentage = +((this.questionsAnswered * 100) / questionQuantity).toFixed(1);
    this.questionsPercentage = calculatedPercentage > 100 ? 100 : calculatedPercentage;
  }

  checkUsabilityGoal($event: boolean, usabilityGoal: UsabilityGoal) {
    if (usabilityGoal.attribute === 'LNR') {
      if ($event === true) {
        this.assessment.answers.planGoalsAnswers.learnability = this.planAnswersConstants.answered.name;
      } else {
        this.assessment.answers.planGoalsAnswers.learnability = this.planAnswersConstants.pending.name;
      }
    } else if (usabilityGoal.attribute === 'EFF') {
      if ($event === true) {
        this.assessment.answers.planGoalsAnswers.efficiency = this.planAnswersConstants.answered.name;
      } else {
        this.assessment.answers.planGoalsAnswers.efficiency = this.planAnswersConstants.pending.name;
      }
    } else if (usabilityGoal.attribute === 'USR') {
      if ($event === true) {
        this.assessment.answers.planGoalsAnswers.userRetentionOverTime = this.planAnswersConstants.answered.name;
      } else {
        this.assessment.answers.planGoalsAnswers.userRetentionOverTime = this.planAnswersConstants.pending.name;
      }
    } else if (usabilityGoal.attribute === 'ERR') {
      if ($event === true) {
        this.assessment.answers.planGoalsAnswers.errorRate = this.planAnswersConstants.answered.name;
      } else {
        this.assessment.answers.planGoalsAnswers.errorRate = this.planAnswersConstants.pending.name;
      }
    } else {
      if ($event === true) {
        this.assessment.answers.planGoalsAnswers.satisfaction = this.planAnswersConstants.answered.name;
      } else {
        this.assessment.answers.planGoalsAnswers.satisfaction = this.planAnswersConstants.pending.name;
      }
    }
  }

  checkApplicationSection($event: boolean, key: string, projectDescription: string) {
    if (key === 'AP-PN') {
      if ($event === true) {
        this.assessment.answers.planApplicationAnswers.projectName = this.planAnswersConstants.answered.name;
      } else {
        this.assessment.answers.planApplicationAnswers.projectName = this.planAnswersConstants.pending.name;
      }
    } else if (key === 'AP-PD') {
      if ($event === true) {
        this.assessment.answers.planApplicationAnswers.projectDescription = this.planAnswersConstants.answered.name;
      } else {
        this.assessment.answers.planApplicationAnswers.projectDescription = this.planAnswersConstants.pending.name;
      }
    } else if (this.isDataManagement(key)) {
      if ($event === true) {
        this.assessment.answers.planApplicationAnswers.dataManagement = this.planAnswersConstants.answered.name;
      } else {
        this.assessment.answers.planApplicationAnswers.dataManagement = this.planAnswersConstants.pending.name;
      }
    } else if (key === this.smartCityCategories.applicationExecutionEnvironment.acronym) {
      if ($event === true) {
        this.assessment.answers.planApplicationAnswers.applicationExecution = this.planAnswersConstants.answered.name;
      } else {
        this.assessment.answers.planApplicationAnswers.applicationExecution = this.planAnswersConstants.pending.name;
      }
    } else if (key === this.smartCityCategories.sensorNetworkManagement.acronym) {
      if ($event === true) {
        this.assessment.answers.planApplicationAnswers.sensorNetwork = this.planAnswersConstants.answered.name;
      } else {
        this.assessment.answers.planApplicationAnswers.sensorNetwork = this.planAnswersConstants.pending.name;
      }
    } else if (key === this.smartCityCategories.dataProcessing.acronym) {
      if ($event === true) {
        this.assessment.answers.planApplicationAnswers.dataProcessing = this.planAnswersConstants.answered.name;
      } else {
        this.assessment.answers.planApplicationAnswers.dataProcessing = this.planAnswersConstants.pending.name;
      }
    } else if (key === this.smartCityCategories.toolsforSoftwareDevelopment.acronym) {
      if ($event === true) {
        this.assessment.answers.planApplicationAnswers.tools = this.planAnswersConstants.answered.name;
      } else {
        this.assessment.answers.planApplicationAnswers.tools = this.planAnswersConstants.pending.name;
      }
    } else if (key === this.smartCityCategories.definingACityModel.acronym) {
      if ($event === true) {
        this.assessment.answers.planApplicationAnswers.definingCityModel = this.planAnswersConstants.answered.name;
      } else {
        this.assessment.answers.planApplicationAnswers.definingCityModel = this.planAnswersConstants.pending.name;
      }
    } else if (key === this.smartCityCategories.dataAccess.acronym) {
      if ($event === true) {
        this.assessment.answers.planApplicationAnswers.dataAccess = this.planAnswersConstants.answered.name;
      } else {
        this.assessment.answers.planApplicationAnswers.dataAccess = this.planAnswersConstants.pending.name;
      }
    } else {
      if ($event === true) {
        this.assessment.answers.planApplicationAnswers.serviceManagement = this.planAnswersConstants.answered.name;
      } else {
        this.assessment.answers.planApplicationAnswers.serviceManagement = this.planAnswersConstants.pending.name;
      }
    }
  }

  verifyUsabilityVariableCheck(attribute: string, parentQuestionKey: string): boolean {
    if (parentQuestionKey === 'VM-4') {
      if (attribute === 'LNR') {
        return this.assessment.answers.planVariableAnswers.learnabilityAtt === this.planAnswersConstants.answered.name;
      } else if (attribute === 'EFF') {
        return this.assessment.answers.planVariableAnswers.efficiencyAtt === this.planAnswersConstants.answered.name;
      } else if (attribute === 'USR') {
        return this.assessment.answers.planVariableAnswers.userRetentionOverTimeAtt === this.planAnswersConstants.answered.name;
      } else if (attribute === 'ERR') {
        return this.assessment.answers.planVariableAnswers.errorRateAtt === this.planAnswersConstants.answered.name;
      } else {
        return this.assessment.answers.planVariableAnswers.satisfactionAtt === this.planAnswersConstants.answered.name;
      }
    } else {
      if (attribute === 'LNR') {
        return this.assessment.answers.planVariableAnswers.learnabilityMeth === this.planAnswersConstants.answered.name;
      } else if (attribute === 'EFF') {
        return this.assessment.answers.planVariableAnswers.efficiencyMeth === this.planAnswersConstants.answered.name;
      } else if (attribute === 'USR') {
        return this.assessment.answers.planVariableAnswers.userRetentionOverTimeMeth === this.planAnswersConstants.answered.name;
      } else if (attribute === 'ERR') {
        return this.assessment.answers.planVariableAnswers.errorRateMeth === this.planAnswersConstants.answered.name;
      } else {
        return this.assessment.answers.planVariableAnswers.satisfactionMeth === this.planAnswersConstants.answered.name;
      }
    }
  }

  checkUsabilityVariable($event: boolean, attribute: string, parentQuestionKey: string) {
    if (parentQuestionKey === 'VM-4') {
      if (attribute === 'LNR') {
        if ($event === true) {
          this.assessment.answers.planVariableAnswers.learnabilityAtt = this.planAnswersConstants.answered.name;
        } else {
          this.assessment.answers.planVariableAnswers.learnabilityAtt = this.planAnswersConstants.pending.name;
        }
      } else if (attribute === 'EFF') {
        if ($event === true) {
          this.assessment.answers.planVariableAnswers.efficiencyAtt = this.planAnswersConstants.answered.name;
        } else {
          this.assessment.answers.planVariableAnswers.efficiencyAtt = this.planAnswersConstants.pending.name;
        }
      } else if (attribute === 'USR') {
        if ($event === true) {
          this.assessment.answers.planVariableAnswers.userRetentionOverTimeAtt = this.planAnswersConstants.answered.name;
        } else {
          this.assessment.answers.planVariableAnswers.userRetentionOverTimeAtt = this.planAnswersConstants.pending.name;
        }
      } else if (attribute === 'ERR') {
        if ($event === true) {
          this.assessment.answers.planVariableAnswers.errorRateAtt = this.planAnswersConstants.answered.name;
        } else {
          this.assessment.answers.planVariableAnswers.errorRateAtt = this.planAnswersConstants.pending.name;
        }
      } else {
        if ($event === true) {
          this.assessment.answers.planVariableAnswers.satisfactionAtt = this.planAnswersConstants.answered.name;
        } else {
          this.assessment.answers.planVariableAnswers.satisfactionAtt = this.planAnswersConstants.pending.name;
        }
      }
    } else {
      if (attribute === 'LNR') {
        if ($event === true) {
          this.assessment.answers.planVariableAnswers.learnabilityMeth = this.planAnswersConstants.answered.name;
        } else {
          this.assessment.answers.planVariableAnswers.learnabilityMeth = this.planAnswersConstants.pending.name;
        }
      } else if (attribute === 'EFF') {
        if ($event === true) {
          this.assessment.answers.planVariableAnswers.efficiencyMeth = this.planAnswersConstants.answered.name;
        } else {
          this.assessment.answers.planVariableAnswers.efficiencyMeth = this.planAnswersConstants.pending.name;
        }
      } else if (attribute === 'USR') {
        if ($event === true) {
          this.assessment.answers.planVariableAnswers.userRetentionOverTimeMeth = this.planAnswersConstants.answered.name;
        } else {
          this.assessment.answers.planVariableAnswers.userRetentionOverTimeMeth = this.planAnswersConstants.pending.name;
        }
      } else if (attribute === 'ERR') {
        if ($event === true) {
          this.assessment.answers.planVariableAnswers.errorRateMeth = this.planAnswersConstants.answered.name;
        } else {
          this.assessment.answers.planVariableAnswers.errorRateMeth = this.planAnswersConstants.pending.name;
        }
      } else {
        if ($event === true) {
          this.assessment.answers.planVariableAnswers.satisfactionMeth = this.planAnswersConstants.answered.name;
        } else {
          this.assessment.answers.planVariableAnswers.satisfactionMeth = this.planAnswersConstants.pending.name;
        }
      }
    }
  }

  ApplicationSectionCheckboxStatus(answer: any): boolean {
    return answer === this.planAnswersConstants.answered.name;
  }

  verifyGoalsCheckState(usabilityGoal: UsabilityGoal): boolean {
    if (usabilityGoal.attribute === 'LNR') {
      return this.assessment.answers.planGoalsAnswers.learnability === this.planAnswersConstants.answered.name;
    } else if (usabilityGoal.attribute === 'EFF') {
      return this.assessment.answers.planGoalsAnswers.efficiency === this.planAnswersConstants.answered.name;
    } else if (usabilityGoal.attribute === 'USR') {
      return this.assessment.answers.planGoalsAnswers.userRetentionOverTime === this.planAnswersConstants.answered.name;
    } else if (usabilityGoal.attribute === 'ERR') {
      return this.assessment.answers.planGoalsAnswers.errorRate === this.planAnswersConstants.answered.name;
    } else {
      return this.assessment.answers.planGoalsAnswers.satisfaction === this.planAnswersConstants.answered.name;
    }
  }

  verifyScaleStatus(scale: Scale): boolean {
    for (const scaleObject of this.assessment.attributeAssessmentVariables.scale) {
      if (scaleObject.acronym === scale.acronym)
        return true;
    }
    return false;
  }

  scaleSelectionCheckbox($event: boolean, scale: Scale) {
    if ($event === true) {
      this.assessment.attributeAssessmentVariables.scale.push(scale);
    } else {
      this.assessment.attributeAssessmentVariables.scale.forEach((item, index) => {
        if (item === scale) this.assessment.attributeAssessmentVariables.scale.splice(index, 1);
      });
    }
  }

  verifyScalesCheckbox(): boolean {
    return this.assessment.answers.planVariableAnswers.suggestedScales === this.planAnswersConstants.answered.name;
  }

  checkScalesCheckbox($event: boolean) {
    if ($event === true) {
      this.assessment.answers.planVariableAnswers.suggestedScales = this.planAnswersConstants.answered.name;
    } else
      this.assessment.answers.planVariableAnswers.suggestedScales = this.planAnswersConstants.pending.name;
  }

  checkClickable(): boolean {
    if (this.assessment.attributeAssessmentVariables.scale.length === 0) {
      this.tooltipTrigger = 'hint';
      return true;
    }
    this.tooltipTrigger = 'noop';
    return this.formEditable !== true;
  }
}
