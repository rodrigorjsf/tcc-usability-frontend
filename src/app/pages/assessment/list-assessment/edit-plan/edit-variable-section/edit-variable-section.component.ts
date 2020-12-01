import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {VuatConstants} from "../../../../../models/constants/vuat-constants";
import {ToastService} from "../../../../../services/toastService";
import {AssessmentService} from "../../../../../@core/auth/services/assessment.service";
import {QuestionService} from "../../../../../@core/auth/services/question.service";
import {NbToastrService} from "@nebular/theme";
import {AssessmentTransferDTO} from "../../../../../models/dto/AssessmentTransferDTO";
import {Assessment} from "../../../../../models/assessment";
import {Scale} from "../../../../../models/AssessmentSections";
import {AssessmentVariablesDTO, VariableDTO} from "../../../../../models/dto/AssessmentVariablesDTO";

@Component({
  selector: 'ngx-edit-variable-section',
  templateUrl: './edit-variable-section.component.html',
  styleUrls: ['./edit-variable-section.component.scss']
})
export class EditVariableSectionComponent implements OnInit {

  assessment: Assessment;
  router: Router;
  isVald = false;
  dataloaded: Promise<boolean>;
  planPercentage: number;
  data: any;
  usabilityScales: Scale[];
  tooltipTrigger: string;
  instrumentQuestions = VuatConstants.PLAN_QUESTIONS;
  planAnswersConstants = VuatConstants.PLAN_ANSWER;
  usabilityAttributes = VuatConstants.USABILITY_ATRIBUTES;
  categories = VuatConstants.CATEGORIES;
  assessmentVariablesDTO: AssessmentVariablesDTO;
  toast: ToastService;

  constructor(private assessmentService: AssessmentService,
              private questionService: QuestionService,
              router: Router,
              private toastrService: NbToastrService) {
    this.toast = new ToastService(toastrService);
    this.router = router;
    this.assessment = <Assessment> this.router.getCurrentNavigation().extras.state;
    this.fillVariableArray();
  }

  ngOnInit() {
    console.log(this.assessment);
    this.assessmentVariablesDTO = new AssessmentVariablesDTO(this.assessment.uid);
    this.getUsabilityScales();

  }

  getUsabilityScales() {
    if (this.usabilityScales === undefined) {
      this.assessmentService.getScaleList()
        .subscribe(scaleData => {
          this.usabilityScales = scaleData;
          this.dataloaded = Promise.resolve(true);
        });
    }
  }

  getCharacterizationQuestionsObject(key: string): any {
    return this.instrumentQuestions.find(item => item['key'] === key);
  }

  isNullOrUndefined(object: any): boolean {
    return object === null || object === undefined;
  }

  isEqual(var1: any, var2: any): boolean {
    return var1 === var2;
  }

  verifyUsabilityVariableCheck(attribute: string, parentQuestionKey: string): boolean {
    if (parentQuestionKey === 'VM-4') {
      if (attribute === 'LRN') {
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
      if (attribute === 'LRN') {
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
      if (attribute === 'LRN') {
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
      if (attribute === 'LRN') {
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
    console.log(this.assessment)
  }

  verifyScaleStatus(scale: Scale): boolean {
    for (const scaleObject of this.assessment.scale) {
      if (scaleObject.acronym === scale.acronym)
        return true;
    }
    return false;
  }

  scaleSelectionCheckbox($event: boolean, scale: Scale, i: number) {
    if ($event === true) {
      this.assessment.scale.push(scale);
    } else {
      const removeIndex = this.assessment.scale.map(
        function (item) {
          return item.uid;
        }).indexOf(scale.uid);
      this.assessment.scale.splice(removeIndex, 1);
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
    if (this.assessment.scale.length === 0) {
      this.tooltipTrigger = 'hint';
      return true;
    }
    this.tooltipTrigger = 'noop';
    return false;
  }

  async onSubmit() {
    this.mountVariables();
    (await this.assessmentService.updateAssessmentVariableSection(this.assessmentVariablesDTO))
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

  mountVariables() {
    this.assessmentVariablesDTO.scale = this.assessment.scale.map(value => value.acronym);
    this.assessmentVariablesDTO.planVariableAnswers = this.assessment.answers.planVariableAnswers;
    this.assessmentVariablesDTO.variables = this.assessment.attributes.map(value =>
      new VariableDTO(value.usabilityAttribute, value.variables, value.obtainedBy));
  }

  private fillVariableArray() {
    if (this.assessment.attributes.length !== 5) {
      let exist = false;
      this.usabilityAttributes.forEach(value => {
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

}
