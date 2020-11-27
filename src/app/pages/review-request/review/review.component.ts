import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {SectionUpdateRequestDTO} from "../../../models/dto/SectionUpdateRequestDTO";
import {Assessment} from "../../../models/assessment";
import {Router} from "@angular/router";
import {
  AssessmentData,
  AssessmentProcedure,
  AssessmentThreat,
  AssessmentTools,
  Attribute,
  Participant,
  Scale,
  SmartCityQuestionnaire,
  UsabilityGoal
} from "../../../models/AssessmentSections";
import {ToastService} from "../../../services/toastService";
import {ReviewRequestDTO} from "../../../models/dto/ReviewRequestDTO";
import {VuatConstants} from "../../../models/constants/vuat-constants";
import {AssessmentService} from "../../../@core/auth/services/assessment.service";
import {ReviewService} from "../../../@core/auth/services/review.service";
import {QuestionService} from "../../../@core/auth/services/question.service";
import {NbDialogService, NbToastrService} from "@nebular/theme";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store";
import {selectUser} from "../../../store/modules/user/user.selectors";
import {PlanAnswers} from "../../../models/assessment-answers";
import {AssessmentTransferDTO} from "../../../models/dto/AssessmentTransferDTO";
import {BeginReviewDTO} from "../../../models/dto/BeginReviewDTO";
import {Review} from "../../../models/Review";
import {FinishReviewDTO} from "../../../models/dto/FinishReviewDTO";
import {DownloadPlanDialogComponent} from "../../modal/download-plan-dialog/download-plan-dialog.component";
import {FinishReviewDialogComponent} from "../../modal/finish-review-dialog/finish-review-dialog.component";

@Component({
  selector: 'ngx-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {

  form: FormGroup;
  sectionUpdate: SectionUpdateRequestDTO;
  assessment: Assessment;
  review: Review;
  router: Router;
  reviewDate: any;
  isVald = false;
  planInfo: any;
  dataloaded: Promise<boolean>;
  planPercentage: number;
  data: any;
  user: any;
  usabilityScales: Scale[];
  tooltipTrigger: string;
  smartCityQuestionnaire: SmartCityQuestionnaire;
  toast: ToastService;
  reviewRequest: ReviewRequestDTO;
  beginReview: BeginReviewDTO;
  finishReview: FinishReviewDTO;
  instrumentQuestions = VuatConstants.PLAN_QUESTIONS;
  usabilityAtributes = VuatConstants.USABILITY_ATRIBUTES;
  categories = VuatConstants.CATEGORIES;
  smartCityCategories = VuatConstants.SMART_CITY_CATEGORY;
  genericSelectOptions = VuatConstants.GENERIC_SELECT_OPTIONS;
  selectOptions = VuatConstants.SELECT_OPTIONS;
  applicationResponse: string;
  goalResponse: string;
  variableResponse: string;
  participantResponse: string;
  tasksResponse: string;
  procedureResponse: string;
  dataResponse: string;
  threatResponse: string;


  constructor(private assessmentService: AssessmentService,
              private reviewService: ReviewService,
              private questionService: QuestionService,
              router: Router,
              private formBuilder: FormBuilder,
              private dialogService: NbDialogService,
              private toastrService: NbToastrService,
              private store: Store<AppState>) {
    this.toast = new ToastService(toastrService);
    this.router = router;
    this.store.select(selectUser).subscribe(user => this.user = user);

    this.planInfo = this.router.getCurrentNavigation().extras.state;
    this.form = this.formBuilder.group({
      questions: this.formBuilder.array([]),
      tools: this.formBuilder.array([]),
      tasks: this.formBuilder.array([]),
      steps: this.formBuilder.array([]),
      threats: this.formBuilder.array([]),
      limitations: this.formBuilder.array([]),
    });
  }

  get isAuthor() {
    if (this.review.assessment.userProfile === 'AUTHOR')
      return true;
    return false;
  }

  get questions() {
    return this.form.controls.questions as FormArray;
  }

  get values() {
    return this.form.value;
  }

  get tools() {
    return this.form.controls.tools as FormArray;
  }

  get tasks() {
    return this.form.controls.tasks as FormArray;
  }

  get steps() {
    return this.form.controls.steps as FormArray;
  }

  get threats() {
    return this.form.controls.threats as FormArray;
  }

  get limitations() {
    return this.form.controls.limitations as FormArray;
  }

  ngOnInit() {
    this.beginReview = new BeginReviewDTO(this.planInfo.reviewUid, this.user.uid);
    this.reviewService.getAssessmentByReviewUid(this.beginReview)
      .subscribe(data => {
        this.review = data;
        console.log(this.review);
        this.loadResources();

        this.dataloaded = Promise.resolve(true);
      });
  }

  private loadResources() {
    this.initResponses();
    this.initQuestionnaire();
    this.initGoals();
    this.initAnswers();
    this.initAssessmentAttribute();
    this.initParticipants();
    this.initAssessmentTools();
    this.initProcedure();
    this.initDataCollection();
    this.initThreats();
  }

  initResponses() {
    this.review.comments.forEach(value => {
      console.log(value.comment);
      if (value.section === this.categories.application.acronym)
        this.applicationResponse = value.comment;
      else if (value.section === this.categories.goals.acronym)
        this.goalResponse = value.comment;
      else if (value.section === this.categories.variables.acronym)
        this.variableResponse = value.comment;
      else if (value.section === this.categories.participants.acronym)
        this.participantResponse = value.comment;
      else if (value.section === this.categories.tasks.acronym)
        this.tasksResponse = value.comment;
      else if (value.section === this.categories.procedure.acronym)
        this.procedureResponse = value.comment;
      else if (value.section === this.categories.data.acronym)
        this.dataResponse = value.comment;
      else
        this.threatResponse = value.comment;
    });
  }

  getApplicationAcronym() {
    return this.categories.application.acronym;
  }

  initQuestionnaire() {
    if (this.isNullOrUndefined(this.review.assessment.smartCityQuestionnaire))
      this.review.assessment.smartCityQuestionnaire = new SmartCityQuestionnaire(null, null,
        null, null, null, null, null, null);
  }

  initGoals() {
    if (this.isNullOrUndefined(this.review.assessment.usabilityGoals) || this.review.assessment.usabilityGoals.length === 0)
      this.review.assessment.usabilityGoals = [new UsabilityGoal('LRN'), new UsabilityGoal('EFF'),
        new UsabilityGoal('USR'), new UsabilityGoal('ERR'), new UsabilityGoal('STF')];
    this.fillGoalsArray();
  }

  initParticipants() {
    if (this.isNullOrUndefined(this.review.assessment.participant)) {
      this.review.assessment.participant = new Participant();
    }
    if (this.review.assessment.participant.questions.length !== 0)
      this.review.assessment.participant.questions.map(value => this.formBuilder.group({question: [value]}));

    if (this.review.assessment.participant.questions.length !== 0) {
      this.review.assessment.participant.questions.map(value =>
        this.questions.push(this.formBuilder.group({
          question: [value],
        })));
    }
  }

  initAssessmentAttribute() {
    if (this.isNullOrUndefined(this.review.assessment.attributes) || this.review.assessment.attributes.length === 0) {
      this.usabilityAtributes.forEach(value => this.review.assessment.attributes.push(new Attribute(value)));
    }
    if (this.isNullOrUndefined(this.review.assessment.scale) || this.review.assessment.scale.length === 0) {
      this.review.assessment.scale = [];
    }
    this.fillVariableArray();
  }

  fillVariableArray() {
    if (this.review.assessment.attributes.length !== 5) {
      let exist = false;
      this.usabilityAtributes.forEach(value => {
        this.review.assessment.attributes.forEach(variable => {
          if (value === variable.usabilityAttribute)
            exist = true;
        });
        if (exist === false) {
          this.review.assessment.attributes.push({usabilityAttribute: value, variables: null, obtainedBy: null});
        }
        exist = false;
      });
    }
  }

  initAssessmentTools() {
    if (this.isNullOrUndefined(this.review.assessment.assessmentTools)) {
      this.review.assessment.assessmentTools = new AssessmentTools();
    }
    if (this.review.assessment.assessmentTools.tools.length !== 0)
      this.review.assessment.assessmentTools.tools.map(value => this.formBuilder.group({tool: [value]}));

    if (this.review.assessment.assessmentTools.tasks.length !== 0) {
      this.review.assessment.assessmentTools.tasks.map(value =>
        this.formBuilder.group({
          description: [value.description],
          taskExecutionTime: [value.taskExecutionTime],
          acceptanceCriteria: [value.acceptanceCriteria],
        }));
    }
    if (this.review.assessment.assessmentTools.tools.length !== 0) {
      this.review.assessment.assessmentTools.tools.map(value =>
        this.tools.push(this.formBuilder.group({
          tool: [value],
        })));
    }
    if (this.review.assessment.assessmentTools.tasks.length !== 0) {
      this.review.assessment.assessmentTools.tasks.map(value =>
        this.tasks.push(this.formBuilder.group(
          {
            description: [value.description],
            taskExecutionTime: [value.taskExecutionTime],
            acceptanceCriteria: [value.acceptanceCriteria],
          })));
    }
  }

  initAnswers() {
    if (this.isNullOrUndefined(this.review.assessment.answers))
      this.review.assessment.answers = new PlanAnswers();
  }

  initProcedure() {
    if (this.isNullOrUndefined(this.review.assessment.assessmentProcedure))
      this.review.assessment.assessmentProcedure = new AssessmentProcedure();
    if (this.review.assessment.assessmentProcedure.assessmentProcedureSteps.length !== 0) {
      this.review.assessment.assessmentProcedure.assessmentProcedureSteps.map(value =>
        this.steps.push(this.formBuilder.group({name: [value.name], description: [value.description]})));
    }
  }

  initDataCollection() {
    if (this.isNullOrUndefined(this.review.assessment.assessmentData))
      this.review.assessment.assessmentData = new AssessmentData();
  }

  initThreats() {
    if (this.isNullOrUndefined(this.review.assessment.assessmentThreat))
      this.review.assessment.assessmentThreat = new AssessmentThreat();
    if (this.review.assessment.assessmentThreat.threats.length !== 0) {
      this.review.assessment.assessmentThreat.threats.map(value =>
        this.threats.push(this.formBuilder.group({threat: [value]})));
    }
    if (this.review.assessment.assessmentThreat.limitations.length !== 0) {
      this.review.assessment.assessmentThreat.limitations.map(value =>
        this.limitations.push(this.formBuilder.group(
          {limitation: [value]})));
    }
  }

  getCharacterizationQuestionsObject(key: string): any {
    return this.instrumentQuestions.find(item => item['key'] === key);
  }

  onClickApplication(section: string) {
    if (this.review.assessment.smartCityQuestionnaire === null || this.review.assessment.smartCityQuestionnaire === undefined) {
      this.review.assessment.smartCityQuestionnaire = new SmartCityQuestionnaire(null, null,
        null, null, null, null, null, null);
    }
    if (section === this.categories.variables.acronym) {
      this.getUsabilityScales();
    }
  }

  getUsabilityScales() {
    if (this.usabilityScales === undefined || this.usabilityScales.length === 0) {
      this.assessmentService.getScaleList()
        .subscribe(scaleData => {
          this.usabilityScales = scaleData;
        });
    }
  }

  isNullOrUndefined(object: any): boolean {
    return object === null || object === undefined;
  }

  isNullOrUndefinedOrFalse(object: any): boolean {
    return object === false || object === null || object === undefined;
  }

  isNullOrUndefinedOrTrue(object: any): boolean {
    return object === true || object === null || object === undefined;
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

  isDataManagement(obj: string): boolean {
    return obj === this.smartCityCategories.dataManagement.acronym;
  }

  isFirstQuestion(obj: string): boolean {
    return obj === 'AP-PN' || obj === 'AP-PD';
  }

  verifyScaleStatus(scale: Scale): boolean {
    for (const scaleObject of this.review.assessment.scale) {
      if (scaleObject.acronym === scale.acronym)
        return true;
    }
    return false;
  }

  scaleSelectionCheckbox($event: boolean, scale: Scale, i: number) {
    if ($event === true) {
      this.review.assessment.scale.push(scale);
    } else {
      const removeIndex = this.review.assessment.scale.map(
        function (item) {
          return item.uid;
        }).indexOf(scale.uid);
      this.review.assessment.scale.splice(removeIndex, 1);
    }
  }


  checkIfToolsIsNotEmpty(): boolean {
    return this.tools.getRawValue().map(value => value.tools).length !== 0;
  }

  checkIfTasksIsNotEmpty(): boolean {
    return this.tasks.getRawValue().map(value => value.tasks).length !== 0;
  }

  getTaskDescription(task: number) {
    return this.tasks.getRawValue()[task].description;
  }

  openFinishDialog() {
    this.finishReview = new FinishReviewDTO(this.review.uid, this.review.comments);
    this.dialogService.open(FinishReviewDialogComponent, {
      context: {
        finishReview: this.finishReview,
      },
    });
  }


  private fillGoalsArray() {
    if (this.review.assessment.usabilityGoals.length !== 5) {
      let exist = false;
      this.usabilityAtributes.forEach(value => {
        this.review.assessment.usabilityGoals.forEach(goal => {
          if (value === goal.attribute)
            exist = true;
        });
        if (exist === false) {
          this.review.assessment.usabilityGoals.push({attribute: value, goal: null, done: false});
        }
        exist = false;
      });
    }
  }

  isInReview() {
    return this.review.state === 'REVIEWING';
  }

  isReviewed() {
    return this.review.state === 'COMPLETED';
  }

  startReview() {
    this.reviewService.startReview(this.beginReview)
      .subscribe(data => {
        this.review = data;
      });
  }

  submitAnswer(acronym: string) {
    this.review.comments.forEach(value => {
      if (value.section === acronym && acronym === this.categories.application.acronym)
        value.comment = this.applicationResponse;
      else if (value.section === acronym && acronym === this.categories.goals.acronym)
        value.comment = this.goalResponse;
      else if (value.section === acronym && acronym === this.categories.variables.acronym)
        value.comment = this.variableResponse;
      else if (value.section === acronym && acronym === this.categories.participants.acronym)
        value.comment = this.participantResponse;
      else if (value.section === acronym && acronym === this.categories.tasks.acronym)
        value.comment = this.tasksResponse;
      else if (value.section === acronym && acronym === this.categories.procedure.acronym)
        value.comment = this.procedureResponse;
      else if (value.section === acronym && acronym === this.categories.data.acronym)
        value.comment = this.dataResponse;
      else if (value.section === acronym && acronym === this.categories.threats.acronym)
        value.comment = this.threatResponse;
    });
    this.toast.showToast('reviewComment', 'top-right', 'success', 'Comment');
    console.log(this.review.comments);
  }

  isBlankComment(response: string) {
    return response === null || response === undefined || response === '';
  }
}
