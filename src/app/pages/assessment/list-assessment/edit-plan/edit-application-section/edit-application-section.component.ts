import {Component, OnInit} from '@angular/core';
import {AssessmentService} from "../../../../../@core/auth/services/assessment.service";
import {QuestionService} from "../../../../../@core/auth/services/question.service";
import {Router} from "@angular/router";
import {VuatConstants} from "../../../../../models/constants/vuat-constants";
import {ApplicationSectionDTO} from "../../../../../models/dto/ApplicationSectionDTO";
import {AssessmentTransferDTO} from "../../../../../models/dto/AssessmentTransferDTO";
import {NbToastrService} from "@nebular/theme";
import {ToastService} from "../../../../../services/toastService";
import {Assessment} from "../../../../../models/assessment";

@Component({
  selector: 'ngx-edit-application-section',
  templateUrl: './edit-application-section.component.html',
  styleUrls: ['./edit-application-section.component.scss'],
})
export class EditApplicationSectionComponent implements OnInit {

  assessment: Assessment;
  router: Router;
  isVald = false;
  dataloaded: Promise<boolean>;
  planPercentage: number;
  data: any;
  tooltipTrigger: string;
  instrumentQuestions = VuatConstants.PLAN_QUESTIONS;
  planAnswersConstants = VuatConstants.PLAN_ANSWER;
  categories = VuatConstants.CATEGORIES;
  smartCityCategories = VuatConstants.SMART_CITY_CATEGORY;
  selectOptions = VuatConstants.SELECT_OPTIONS;
  smartCityQuestionnaire: ApplicationSectionDTO;
  toast: ToastService;

  constructor(private assessmentService: AssessmentService,
              private questionService: QuestionService,
              router: Router,
              private toastrService: NbToastrService) {
    this.toast = new ToastService(toastrService);
    this.router = router;
    this.assessment = <Assessment> this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit() {
    this.smartCityQuestionnaire = new ApplicationSectionDTO(this.assessment.uid);
  }

  getApplicationAcronym() {
    return this.categories.application.acronym;
  }

  getCharacterizationQuestionsObject(key: string): any {
    return this.instrumentQuestions.find(item => item['key'] === key);
  }

  isNullOrUndefined(object: any): boolean {
    return object === null || object === undefined;
  }

  isNull(object: any): boolean {
    return object === null;
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

  ApplicationSectionCheckboxStatus(answer: any): boolean {
    return answer === this.planAnswersConstants.answered.name;
  }

  checkApplicationSection($event: boolean, key: string, projectDescription: string) {
    console.log(this.assessment.smartCityQuestionnaire);
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

  async onSubmit() {
    this.mountQuestionnaire();
    (await this.assessmentService.updateAssessmentApplicationSection(this.smartCityQuestionnaire))
      .subscribe(data => {
          this.toast.showToast('update', 'top-right', 'success', 'Assessment');
          this.assessment = data;
          const assessmentTransferDTO = new AssessmentTransferDTO(this.assessment.uid, this.assessment.projectName);
          this.router.navigate(['/pages/assessment/my-plans/edit'], {state: assessmentTransferDTO});
        },
        () => {
          this.toast.showToast('update', 'top-right', 'danger', 'Assessment');
        });
  }

  mountQuestionnaire() {
    this.smartCityQuestionnaire.projectName = this.assessment.projectName;
    this.smartCityQuestionnaire.projectDescription = this.assessment.projectDescription;
    this.smartCityQuestionnaire.hasDataManagement = this.assessment.smartCityQuestionnaire.hasDataManagement;
    this.smartCityQuestionnaire.hasAppExecution = this.assessment.smartCityQuestionnaire.hasAppExecution;
    this.smartCityQuestionnaire.hasSensorNetwork = this.assessment.smartCityQuestionnaire.hasSensorNetwork;
    this.smartCityQuestionnaire.hasDataProcessing = this.assessment.smartCityQuestionnaire.hasDataProcessing;
    this.smartCityQuestionnaire.hasDataAccess = this.assessment.smartCityQuestionnaire.hasDataAccess;
    this.smartCityQuestionnaire.hasServiceManagement = this.assessment.smartCityQuestionnaire.hasServiceManagement;
    this.smartCityQuestionnaire.hasSoftwareTools = this.assessment.smartCityQuestionnaire.hasSoftwareTools;
    this.smartCityQuestionnaire.defineCityModel = this.assessment.smartCityQuestionnaire.defineCityModel;
    this.smartCityQuestionnaire.planApplicationAnswers = this.assessment.answers.planApplicationAnswers;
  }
}
