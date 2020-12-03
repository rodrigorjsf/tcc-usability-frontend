import { Component, OnInit } from '@angular/core';
import {AssessmentService} from "../../../../@core/auth/services/assessment.service";
import {ReviewService} from "../../../../@core/auth/services/review.service";
import {QuestionService} from "../../../../@core/auth/services/question.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {NbDialogService, NbToastrService} from "@nebular/theme";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../store";
import {ToastService} from "../../../../services/toastService";
import {selectUser} from "../../../../store/modules/user/user.selectors";
import {SectionUpdateRequestDTO} from "../../../../models/dto/SectionUpdateRequestDTO";
import {SectionControlRequestDTO} from "../../../../models/dto/SectionControlRequestDTO";
import {SectionControlResponseDTO} from "../../../../models/dto/SectionControlResponseDTO";
import {Assessment} from "../../../../models/assessment";
import {
  AssessmentData,
  AssessmentProcedure, AssessmentThreat,
  AssessmentTools,
  Attribute,
  Participant,
  Scale,
  SmartCityQuestionnaire,
  UsabilityGoal
} from "../../../../models/AssessmentSections";
import {ReviewRequestDTO} from "../../../../models/dto/ReviewRequestDTO";
import {VuatConstants} from "../../../../models/constants/vuat-constants";
import {format} from "date-fns";
import {type} from "os";
import {PlanAnswers} from "../../../../models/assessment-answers";

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  form: FormGroup;
  sectionUpdate: SectionUpdateRequestDTO;
  sectionRequest: SectionControlRequestDTO;
  sectionResponse: SectionControlResponseDTO;
  formEditable = false;
  assessment: Assessment;
  router: Router;
  reviewDate: any;
  isVald = false;
  planInfo: any;
  dataloaded: Promise<boolean>;
  questionsAnswered = 0;
  questionsPercentage: number;
  planPercentage: number;
  data: any;
  user: any;
  usabilityScales: Scale[];
  tooltipTrigger: string;
  submitTooltip: string;
  smartCityQuestionnaire: SmartCityQuestionnaire;
  toast: ToastService;
  reviewRequest: ReviewRequestDTO;
  private readonly instrumentQuestions = VuatConstants.PLAN_QUESTIONS;
  private readonly planAnswersConstants = VuatConstants.PLAN_ANSWER;
  private readonly usabilityAtributes = VuatConstants.USABILITY_ATRIBUTES;
  categories = VuatConstants.CATEGORIES;
  smartCityCategories = VuatConstants.SMART_CITY_CATEGORY;
  genericSelectOptions = VuatConstants.GENERIC_SELECT_OPTIONS;
  selectOptions = VuatConstants.SELECT_OPTIONS;
  private sectionControl = VuatConstants.SECTION_CONTROL;

  constructor(private assessmentService: AssessmentService,
              private reviewService: ReviewService,
              private questionService: QuestionService,
              router: Router,
              private dialogService: NbDialogService,
              private toastrService: NbToastrService,
              private store: Store<AppState>) {
    this.toast = new ToastService(toastrService);
    this.router = router;
    this.store.select(selectUser).subscribe(user => this.user = user);
    this.planInfo = this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit() {
    this.assessment = new Assessment();
    this.assessmentService.getAssessmentByUid(this.planInfo.assessmentUid)
      .subscribe(data => {
        this.assessment = data;
        this.loadResources();
        console.log(this.assessment);
        this.dataloaded = Promise.resolve(true);
      });
    this.assessmentService.releaseSection(this.user.uid).subscribe();
  }

  private loadResources() {
    this.initQuestionnaire();
    this.initGoals();
    this.initAssessmentAttribute();
    this.initParticipants();
  }

  isEqual(var1: any, var2: any): boolean {
    return var1 === var2;
  }

  isNull(object: any): boolean {
    return object === null;
  }

  isNullOrUndefined(object: any): boolean {
    return object === null || object === undefined;
  }

  isNullOrUndefinedOrEmpty(object: any[]): boolean {
    return object === null || object === undefined || object.length === 0;
  }

  isDataManagement(obj: string): boolean {
    return obj === this.smartCityCategories.dataManagement.acronym;
  }

  removeNumberString(text: string): string {
    return text.replace(/[0-9]/g, '').split('.').join('').trim();
  }

  formatedDate(): string {
    return format(new Date(this.assessment.creationDate), 'yyyy-MM-dd');
  }

  isFirstQuestion(obj: string): boolean {
    return obj === 'AP-PN' || obj === 'AP-PD';
  }

  back() {
    this.router.navigate(['/pages/assessment/my-plans']);
  }

  getCharacterizationQuestionsObject(key: string): any {
    return this.instrumentQuestions.find(item => item['key'] === key);
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
    this.fillGoalsArray();
  }

  private fillGoalsArray() {
    if (this.assessment.usabilityGoals.length !== 5) {
      let exist = false;
      this.usabilityAtributes.forEach(value => {
        this.assessment.usabilityGoals.forEach(goal => {
          if (value === goal.attribute)
            exist = true;
        });
        if (exist === false) {
          this.assessment.usabilityGoals.push({attribute: value, goal: null, done: false});
        }
        exist = false;
      });
    }
  }

  initAssessmentAttribute() {
    if (this.isNullOrUndefined(this.assessment.attributes) || this.assessment.attributes.length === 0) {
      this.usabilityAtributes.forEach(value => this.assessment.attributes.push(new Attribute(value)));
    }
    if (this.isNullOrUndefined(this.assessment.scale) || this.assessment.scale.length === 0) {
      this.assessment.scale = [];
    }
    this.fillVariableArray();
  }

  fillVariableArray() {
    if (this.assessment.attributes.length !== 5) {
      let exist = false;
      this.usabilityAtributes.forEach(value => {
        this.assessment.attributes.forEach(variable => {
          if (value === variable.usabilityAttribute)
            exist = true;
        });
        if (exist === false) {
          this.assessment.attributes.push({usabilityAttribute: value, variables: null, obtainedBy: null});
        }
        exist = false;
      });
    }
  }

  initParticipants() {
    if (this.isNullOrUndefined(this.assessment.participant)) {
      this.assessment.participant = new Participant();
    }
  }
}
