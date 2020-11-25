import {Component, OnInit, TemplateRef} from '@angular/core';
import {Router} from "@angular/router";
import {VuatConstants} from "../../../../../models/constants/vuat-constants";
import {ToastService} from "../../../../../services/toastService";
import {AssessmentService} from "../../../../../@core/auth/services/assessment.service";
import {QuestionService} from "../../../../../@core/auth/services/question.service";
import {NbDialogService, NbToastrService} from "@nebular/theme";
import {AssessmentTransferDTO} from "../../../../../models/dto/AssessmentTransferDTO";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {Assessment} from "../../../../../models/assessment";
import {AssessmentProcedureDTO} from "../../../../../models/dto/AssessmentProcedureDTO";
import {format} from 'date-fns';

@Component({
  selector: 'ngx-edit-procedure-section',
  templateUrl: './edit-procedure-section.component.html',
  styleUrls: ['./edit-procedure-section.component.scss']
})
export class EditProcedureSectionComponent implements OnInit {

  form: FormGroup;
  assessment: any;
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
  genericSelectOptions = VuatConstants.GENERIC_SELECT_OPTIONS;
  assessmentProcedureDTO: AssessmentProcedureDTO;
  toast: ToastService;

  constructor(private assessmentService: AssessmentService,
              private questionService: QuestionService,
              private formBuilder: FormBuilder,
              private dialogService: NbDialogService,
              router: Router,
              private toastrService: NbToastrService) {
    this.toast = new ToastService(toastrService);
    this.router = router;
    this.assessment = this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      steps: this.formBuilder.array([]),
    });
    if (this.assessment.assessmentProcedure.assessmentProcedureSteps.length !== 0) {
      this.assessment.assessmentProcedure.assessmentProcedureSteps.map(value =>
        this.steps.push(this.formBuilder.group({name: [value.name], description: [value.description]})));
    }
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

  isNullOrUndefinedOrFalse(object: any): boolean {
    return object === false || object === null || object === undefined;
  }

  isNull(object: any): boolean {
    return object === null;
  }

  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, {context: 'this is some additional data passed to dialog'});
  }

  verifyProcedureState(key: string) {
    if (key === 'PR-18-1') {
      return this.assessment.answers.planProcedureAnswers.whenOccur === this.planAnswersConstants.answered.name;
    } else if (key === 'PR-18-2') {
      return this.assessment.answers.planProcedureAnswers.whereOccur === this.planAnswersConstants.answered.name;
    } else if (key === 'PR-18-3') {
      return this.assessment.answers.planProcedureAnswers.howOccur === this.planAnswersConstants.answered.name;
    } else if (key === 'PR-18-4') {
      return this.assessment.answers.planProcedureAnswers.howMuchTime === this.planAnswersConstants.answered.name;
    } else if (key === 'PR-19') {
      return this.assessment.answers.planProcedureAnswers.assessmentProcedureSteps === this.planAnswersConstants.answered.name;
    } else if (key === 'PR-20') {
      return this.assessment.answers.planProcedureAnswers.questionsAllowed === this.planAnswersConstants.answered.name;
    } else {
      return this.assessment.answers.planProcedureAnswers.isPilotAssessment === this.planAnswersConstants.answered.name;
    }
  }

  checkProcedureQuestion($event: boolean, key: string) {
    if (key === 'PR-18-1') {
      if ($event === true) {
        this.assessment.answers.planProcedureAnswers.whenOccur = this.planAnswersConstants.answered.name;
      } else {
        this.assessment.answers.planProcedureAnswers.whenOccur = this.planAnswersConstants.pending.name;
      }
    } else if (key === 'PR-18-2') {
      if ($event === true) {
        this.assessment.answers.planProcedureAnswers.whereOccur = this.planAnswersConstants.answered.name;
      } else {
        this.assessment.answers.planProcedureAnswers.whereOccur = this.planAnswersConstants.pending.name;
      }
    } else if (key === 'PR-18-3') {
      if ($event === true) {
        this.assessment.answers.planProcedureAnswers.howOccur = this.planAnswersConstants.answered.name;
      } else {
        this.assessment.answers.planProcedureAnswers.howOccur = this.planAnswersConstants.pending.name;
      }
    } else if (key === 'PR-18-4') {
      if ($event === true) {
        this.assessment.answers.planProcedureAnswers.howMuchTime = this.planAnswersConstants.answered.name;
      } else {
        this.assessment.answers.planProcedureAnswers.howMuchTime = this.planAnswersConstants.pending.name;
      }
    } else if (key === 'PR-19') {
      if ($event === true) {
        this.assessment.answers.planProcedureAnswers.assessmentProcedureSteps = this.planAnswersConstants.answered.name;
      } else {
        this.assessment.answers.planProcedureAnswers.assessmentProcedureSteps = this.planAnswersConstants.pending.name;
      }
    } else if (key === 'PR-20') {
      if ($event === true) {
        this.assessment.answers.planProcedureAnswers.questionsAllowed = this.planAnswersConstants.answered.name;
      } else {
        this.assessment.answers.planProcedureAnswers.questionsAllowed = this.planAnswersConstants.pending.name;
      }
    } else {
      if ($event === true) {
        this.assessment.answers.planProcedureAnswers.isPilotAssessment = this.planAnswersConstants.answered.name;
      } else {
        this.assessment.answers.planProcedureAnswers.isPilotAssessment = this.planAnswersConstants.pending.name;
      }
    }
  }

  private newStep(): FormGroup {
    return this.formBuilder.group({name: [''], description: ['']});
  }

  addSteps() {
    if (this.newStep().getRawValue() !== '')
      this.steps.push(this.newStep());
  }

  removeSteps(i: number) {
    this.steps.removeAt(i);
  }

  get steps() {
    return this.form.controls.steps as FormArray;
  }

  async onSubmit() {
    this.mountProcedure();
    (await this.assessmentService.updateAssessmentProcedureSection(this.assessmentProcedureDTO))
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

  mountProcedure() {
    this.assessmentProcedureDTO = new AssessmentProcedureDTO(
      this.assessment.uid,
      format(this.assessment.assessmentProcedure.occurDate, 'yyyy-MM-dd'),
      this.assessment.assessmentProcedure.occurLocal,
      this.assessment.assessmentProcedure.occurDetail,
      this.assessment.assessmentProcedure.occurTime,
      this.steps.getRawValue().map(value => value),
      this.assessment.assessmentProcedure.isPilotAssessment,
      this.assessment.assessmentProcedure.pilotDescription,
      this.assessment.assessmentProcedure.questionsAllowed,
      this.assessment.answers.planProcedureAnswers);
    console.log(this.assessmentProcedureDTO);
  }

}
