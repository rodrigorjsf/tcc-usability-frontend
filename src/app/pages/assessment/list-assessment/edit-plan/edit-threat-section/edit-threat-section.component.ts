import {Component, OnInit, TemplateRef} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {VuatConstants} from "../../../../../models/constants/vuat-constants";
import {ToastService} from "../../../../../services/toastService";
import {AssessmentService} from "../../../../../@core/auth/services/assessment.service";
import {QuestionService} from "../../../../../@core/auth/services/question.service";
import {NbDialogService, NbToastrService} from "@nebular/theme";
import {AssessmentTransferDTO} from "../../../../../models/dto/AssessmentTransferDTO";
import {Assessment} from "../../../../../models/assessment";
import {AssessmentThreatDTO} from "../../../../../models/dto/AssessmentThreatDTO";

@Component({
  selector: 'ngx-edit-threat-section',
  templateUrl: './edit-threat-section.component.html',
  styleUrls: ['./edit-threat-section.component.scss']
})
export class EditThreatSectionComponent implements OnInit {

  form: FormGroup;
  assessment: any;
  router: Router;
  instrumentQuestions = VuatConstants.PLAN_QUESTIONS;
  planAnswersConstants = VuatConstants.PLAN_ANSWER;
  categories = VuatConstants.CATEGORIES;
  genericSelectOptions = VuatConstants.GENERIC_SELECT_OPTIONS;
  assessmentThreatDTO: AssessmentThreatDTO;
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

  get threats() {
    return this.form.controls.threats as FormArray;
  }

  get limitations() {
    return this.form.controls.limitations as FormArray;
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      threats: this.formBuilder.array([]),
      limitations: this.formBuilder.array([]),
    });
    if (this.assessment.assessmentThreat.threats.length !== 0) {
      this.assessment.assessmentThreat.threats.map(value =>
        this.threats.push(this.formBuilder.group({threat: [value]})));
    }
    if (this.assessment.assessmentThreat.limitations.length !== 0) {
      this.assessment.assessmentThreat.limitations.map(value =>
        this.limitations.push(this.formBuilder.group(
          {limitation: [value]})));
    }
  }

  addThreats() {
    if (this.newThreat().getRawValue() !== '')
      this.threats.push(this.newThreat());
  }

  removeThreat(i: number) {
    this.threats.removeAt(i);
  }

  addLimitation() {
    if (this.newLimitation().getRawValue() !== '')
      this.limitations.push(this.newLimitation());
  }

  removeLimitation(i: number) {
    this.limitations.removeAt(i);
  }

  isNullOrUndefinedOrFalse(object: any): boolean {
    return object === false || object === null || object === undefined;
  }

  verifyThreatState(key: string) {
    if (key === 'TH-25-1') {
      return this.assessment.answers.planThreatsAnswers.whatThreats === this.planAnswersConstants.answered.name;
    } else if (key === 'TH-25-2') {
      return this.assessment.answers.planThreatsAnswers.threatsValidityControlled === this.planAnswersConstants.answered.name;
    } else if (key === 'TH-25-3') {
      return this.assessment.answers.planThreatsAnswers.assessmentLimitations === this.planAnswersConstants.answered.name;
    } else if (key === 'TH-25-4') {
      return this.assessment.answers.planThreatsAnswers.ethicalAspects === this.planAnswersConstants.answered.name;
    } else {
      return this.assessment.answers.planThreatsAnswers.assessmentBiases === this.planAnswersConstants.answered.name;
    }
  }

  checkThreatQuestion($event: boolean, key: string) {
    if (key === 'TH-25-1') {
      if ($event === true) {
        this.assessment.answers.planThreatsAnswers.whatThreats = this.planAnswersConstants.answered.name;
      } else {
        this.assessment.answers.planThreatsAnswers.whatThreats = this.planAnswersConstants.pending.name;
      }
    } else if (key === 'TH-25-2') {
      if ($event === true) {
        this.assessment.answers.planThreatsAnswers.threatsValidityControlled = this.planAnswersConstants.answered.name;
      } else {
        this.assessment.answers.planThreatsAnswers.threatsValidityControlled = this.planAnswersConstants.pending.name;
      }
    } else if (key === 'TH-25-3') {
      if ($event === true) {
        this.assessment.answers.planThreatsAnswers.assessmentLimitations = this.planAnswersConstants.answered.name;
      } else {
        this.assessment.answers.planThreatsAnswers.assessmentLimitations = this.planAnswersConstants.pending.name;
      }
    } else if (key === 'TH-25-4') {
      if ($event === true) {
        this.assessment.answers.planThreatsAnswers.ethicalAspects = this.planAnswersConstants.answered.name;
      } else {
        this.assessment.answers.planThreatsAnswers.ethicalAspects = this.planAnswersConstants.pending.name;
      }
    } else {
      if ($event === true) {
        this.assessment.answers.planThreatsAnswers.assessmentBiases = this.planAnswersConstants.answered.name;
      } else {
        this.assessment.answers.planThreatsAnswers.assessmentBiases = this.planAnswersConstants.pending.name;
      }
    }
  }

  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, {context: 'this is some additional data passed to dialog'});
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

  async onSubmit() {
    this.mountThreats();
    (await this.assessmentService.updateAssessmentThreatsSection(this.assessmentThreatDTO))
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

  mountThreats() {
    this.assessmentThreatDTO = new AssessmentThreatDTO(
      this.assessment.uid,
      this.threats.getRawValue().map(value => value.threat),
      this.assessment.assessmentThreat.controlMeasure,
      this.limitations.getRawValue().map(value => value.limitation),
      this.assessment.assessmentThreat.ethicalAspectsDefined,
      this.assessment.assessmentThreat.ethicalAspectsDescription,
      this.assessment.assessmentThreat.biasDescription,
      this.assessment.answers.planThreatsAnswers);
    console.log(this.assessmentThreatDTO);
  }

  private newThreat(): FormGroup {
    return this.formBuilder.group({threat: ['']});
  }

  private newLimitation(): FormGroup {
    return this.formBuilder.group({limitation: ['']});
  }

}
