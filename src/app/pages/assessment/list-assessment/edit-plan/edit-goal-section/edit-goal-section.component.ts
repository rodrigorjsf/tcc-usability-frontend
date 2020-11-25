import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {VuatConstants} from "../../../../../models/constants/vuat-constants";
import {ToastService} from "../../../../../services/toastService";
import {AssessmentService} from "../../../../../@core/auth/services/assessment.service";
import {QuestionService} from "../../../../../@core/auth/services/question.service";
import {NbToastrService} from "@nebular/theme";
import {AssessmentTransferDTO} from "../../../../../models/dto/AssessmentTransferDTO";
import {Assessment} from "../../../../../models/assessment";
import {UsabilityGoal} from "../../../../../models/AssessmentSections";
import {Goal, UsabilityGoalDTO} from "../../../../../models/dto/UsabilityGoalDTO";

@Component({
  selector: 'ngx-edit-goal-section',
  templateUrl: './edit-goal-section.component.html',
  styleUrls: ['./edit-goal-section.component.scss'],
})
export class EditGoalSectionComponent implements OnInit {

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
  usabilityAttributes = VuatConstants.USABILITY_ATRIBUTES;
  usabilityGoals: UsabilityGoalDTO;
  toast: ToastService;

  constructor(private assessmentService: AssessmentService,
              private questionService: QuestionService,
              router: Router,
              private toastrService: NbToastrService) {
    this.toast = new ToastService(toastrService);
    this.router = router;
    this.assessment = this.router.getCurrentNavigation().extras.state;
    this.fillGoalsArray();
  }

  ngOnInit() {
    this.usabilityGoals = new UsabilityGoalDTO(this.assessment.uid);
  }

  private fillGoalsArray() {
    if (this.assessment.usabilityGoals.length !== 5) {
      let exist = false;
      this.usabilityAttributes.forEach(value => {
        this.assessment.usabilityGoals.forEach(goal => {
          if (value === goal.attribute)
            exist = true;
        });
        if (exist === false) {
          this.assessment.usabilityGoals.push({attribute: value.attribute, goal: null, done: false});
        }
        exist = false;
      });
    }
  }

  getCharacterizationQuestionsObject(key: string): any {
    return this.instrumentQuestions.find(item => item['key'] === key);
  }

  isEqual(var1: any, var2: any): boolean {
    return var1 === var2;
  }

  verifyGoalsCheckState(usabilityGoal: UsabilityGoal): boolean {
    if (usabilityGoal.attribute === 'LRN') {
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

  checkUsabilityGoal($event: boolean, usabilityGoal: UsabilityGoal) {


    console.log(this.assessment.answers.planGoalsAnswers.learnability, this.assessment.answers.planGoalsAnswers.satisfaction);
    if (usabilityGoal.attribute === 'LRN') {
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
    console.log($event, usabilityGoal);
  }

  async onSubmit() {
    this.mountUsabilityGoals();
    (await this.assessmentService.updateAssessmentGoalsSection(this.usabilityGoals))
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

  mountUsabilityGoals() {
    this.usabilityGoals.goals = this.assessment.usabilityGoals.map(value =>
      new Goal(value.attribute, value.goal));
    this.usabilityGoals.planGoalsAnswers = this.assessment.answers.planGoalsAnswers;
  }
}
