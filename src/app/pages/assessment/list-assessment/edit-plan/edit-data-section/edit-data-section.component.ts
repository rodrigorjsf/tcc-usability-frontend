import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {VuatConstants} from "../../../../../models/constants/vuat-constants";
import {ToastService} from "../../../../../services/toastService";
import {AssessmentService} from "../../../../../@core/auth/services/assessment.service";
import {QuestionService} from "../../../../../@core/auth/services/question.service";
import {NbToastrService} from "@nebular/theme";
import {AssessmentTransferDTO} from "../../../../../models/dto/AssessmentTransferDTO";
import {AssessmentDataDTO} from "../../../../../models/dto/AssessmentDataDTO";
import {Assessment} from "../../../../../models/assessment";

@Component({
  selector: 'ngx-edit-data-section',
  templateUrl: './edit-data-section.component.html',
  styleUrls: ['./edit-data-section.component.scss'],
})
export class EditDataSectionComponent implements OnInit {

  assessment: any;
  router: Router;
  instrumentQuestions = VuatConstants.PLAN_QUESTIONS;
  planAnswersConstants = VuatConstants.PLAN_ANSWER;
  categories = VuatConstants.CATEGORIES;
  assessmentDataDTO: AssessmentDataDTO;
  genericSelectOptions = VuatConstants.GENERIC_SELECT_OPTIONS;
  toast: ToastService;

  constructor(private assessmentService: AssessmentService,
              private questionService: QuestionService,
              router: Router,
              private toastrService: NbToastrService) {
    this.toast = new ToastService(toastrService);
    this.router = router;
    this.assessment = this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit() {
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

  isNullOrUndefinedOrFalse(object: any): boolean {
    return object === false || object === null || object === undefined;
  }

  isNullOrUndefinedOrTrue(object: any): boolean {
    return object === true || object === null || object === undefined;
  }

  verifyDataState(key: string) {
    if (key === 'DT-22') {
      return this.assessment.answers.planDataAnswers.dataCollectionProcedure === this.planAnswersConstants.answered.name;
    } else if (key === 'DT-23') {
      return this.assessment.answers.planDataAnswers.dataCollectedAnalyzed === this.planAnswersConstants.answered.name;
    } else {
      return this.assessment.answers.planDataAnswers.statisticalMethods === this.planAnswersConstants.answered.name;
    }
  }

  checkDataQuestion($event: boolean, key: string) {
    if (key === 'DT-22') {
      if ($event === true) {
        this.assessment.answers.planDataAnswers.dataCollectionProcedure = this.planAnswersConstants.answered.name;
      } else {
        this.assessment.answers.planDataAnswers.dataCollectionProcedure = this.planAnswersConstants.pending.name;
      }
    } else if (key === 'DT-23') {
      if ($event === true) {
        this.assessment.answers.planDataAnswers.dataCollectedAnalyzed = this.planAnswersConstants.answered.name;
      } else {
        this.assessment.answers.planDataAnswers.dataCollectedAnalyzed = this.planAnswersConstants.pending.name;
      }
    } else {
      if ($event === true) {
        this.assessment.answers.planDataAnswers.statisticalMethods = this.planAnswersConstants.answered.name;
      } else {
        this.assessment.answers.planDataAnswers.statisticalMethods = this.planAnswersConstants.pending.name;
      }
    }
  }

  async onSubmit() {
    this.mountData();
    (await this.assessmentService.updateAssessmentDataSection(this.assessmentDataDTO))
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

  mountData() {
    this.assessmentDataDTO = new AssessmentDataDTO(
      this.assessment.uid,
      this.assessment.assessmentData.dataCollectionProcedure,
      this.assessment.assessmentData.analysisDescription,
      this.assessment.assessmentData.statisticalMethods,
      this.assessment.assessmentData.statisticalMethodsDescription,
      this.assessment.answers.planDataAnswers);
  }
}
