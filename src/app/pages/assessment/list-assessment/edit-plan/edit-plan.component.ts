import {Component, OnInit} from '@angular/core';
import {Assessment} from '../../../../models/assessment';
import {AssessmentService} from '../../../../@core/auth/services/assessment.service';
import {Router} from '@angular/router';
import {QuestionService} from '../../../../@core/auth/services/question.service';
import {VuatConstants} from '../../../../models/constants/vuat-constants';
import {SmartCityQuestionnaire} from "../../../../models/AssessmentSections";

@Component({
  selector: 'ngx-edit-plan',
  templateUrl: './edit-plan.component.html',
  styleUrls: ['./edit-plan.component.scss'],
})
export class EditPlanComponent implements OnInit {

  assessment: Assessment;
  show = true;
  router: Router;
  isVald = false;
  planInfo: any;
  dataloaded: Promise<boolean>;
  questionsAnswered = 0;
  questionsPercentage: number;
  data: any;
  private readonly instrumentQuestions = VuatConstants.PLAN_QUESTIONS;
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
  radionOptions: any = {
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
    console.log(this.planInfo);
  }

  ngOnInit() {
    this.assessment = new Assessment();
    this.assessmentService.getAssessmentByUid(this.planInfo.assessmentUid)
      .subscribe(data => {
        this.data = data;
        console.log(this.data);
        this.assessment = data;
        console.log(this.assessment);
        this.dataloaded = Promise.resolve(true);
      });
    this.show = false;
  }

  getApplicationAcronym() {
    return this.categories.application.acronym;
  }

  getCharacterizationQuestionsObject(key: string): any {
    return this.instrumentQuestions.find(item => item['key'] === key);
  }

  onClickApplication(section: string) {
    if (this.assessment.smartCityQuestionnaire === null || this.assessment.smartCityQuestionnaire === undefined) {
      this.assessment.smartCityQuestionnaire = new SmartCityQuestionnaire();
    }
    this.calculateProgressPercentage(section);
  }

  isNullOrUndefined(object: any): boolean {
    return object === null || object === undefined;
  }

  isNull(object: any): boolean {
    return object === null;
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
    else if (this.questionsPercentage > 25 && this.questionsPercentage <= 50)
      return 'warning';
    else if (this.questionsPercentage > 50 && this.questionsPercentage <= 75)
      return 'primary';
    else
      return 'success';
  }


  calculateProgressPercentage(section: string) {
    this.questionsPercentage = 0;
    this.questionsAnswered = 0;
    if (this.categories.application.acronym === section) {
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
    } else if (this.categories.goals.acronym === section) {

    }

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
}
