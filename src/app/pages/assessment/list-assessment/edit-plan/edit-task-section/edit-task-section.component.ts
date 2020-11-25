import {Component, OnInit, TemplateRef} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {VuatConstants} from "../../../../../models/constants/vuat-constants";
import {ToastService} from "../../../../../services/toastService";
import {AssessmentService} from "../../../../../@core/auth/services/assessment.service";
import {QuestionService} from "../../../../../@core/auth/services/question.service";
import {NbDialogService, NbToastrService} from "@nebular/theme";
import {AssessmentTransferDTO} from "../../../../../models/dto/AssessmentTransferDTO";
import {AssessmentToolsDTO} from "../../../../../models/dto/AssessmentToolsDTO";
import {Assessment} from "../../../../../models/assessment";

@Component({
  selector: 'ngx-edit-task-section',
  templateUrl: './edit-task-section.component.html',
  styleUrls: ['./edit-task-section.component.scss']
})
export class EditTaskSectionComponent implements OnInit {

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
  selectOptions = VuatConstants.SELECT_OPTIONS;
  assessmentToolsDTO: AssessmentToolsDTO;
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
    console.log(this.assessment.variables.length);
  }

  get tools() {
    return this.form.controls.tools as FormArray;
  }

  get tasks() {
    return this.form.controls.tasks as FormArray;
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      tools: this.formBuilder.array([]),
      tasks: this.formBuilder.array([]),
    });
    if (this.assessment.assessmentTools.tools.length !== 0) {
      this.assessment.assessmentTools.tools.map(value =>
        this.tools.push(this.formBuilder.group({
          tool: [value],
        })));
    }
    if (this.assessment.assessmentTools.tasks.length !== 0) {
      this.assessment.assessmentTools.tasks.map(value =>
        this.tasks.push(this.formBuilder.group(
          {
            description: [value.description],
            taskExecutionTime: [value.taskExecutionTime],
            acceptanceCriteria: [value.acceptanceCriteria],
          })));
    }
  }

  addTools() {
    if (this.newTool().getRawValue() !== '')
      this.tools.push(this.newTool());
  }

  removeTool(i: number) {
    this.tools.removeAt(i);
  }

  addTasks() {
    if (this.newTask().getRawValue() !== '')
      this.tasks.push(this.newTask());
  }

  removeTask(i: number) {
    this.tasks.removeAt(i);
  }

  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, {context: 'this is some additional data passed to dialog'});
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

  verifyMaterialsCheckState(key: string) {
    if (key === 'TM-14') {
      return this.assessment.answers.planTasksAnswers.usedTools === this.planAnswersConstants.answered.name;
    } else if (key === 'TM-15') {
      return this.assessment.answers.planTasksAnswers.tasksToPerform === this.planAnswersConstants.answered.name;
    } else if (key === 'TM-16') {
      return this.assessment.answers.planTasksAnswers.tasksTime === this.planAnswersConstants.answered.name;
    } else {
      return this.assessment.answers.planTasksAnswers.criteria === this.planAnswersConstants.answered.name;
    }
  }

  checkMaterial($event: boolean, key: string) {
    if (key === 'TM-14') {
      if ($event === true) {
        this.assessment.answers.planTasksAnswers.usedTools = this.planAnswersConstants.answered.name;
      } else {
        this.assessment.answers.planTasksAnswers.usedTools = this.planAnswersConstants.pending.name;
      }
    } else if (key === 'TM-15') {
      if ($event === true) {
        this.assessment.answers.planTasksAnswers.tasksToPerform = this.planAnswersConstants.answered.name;
      } else {
        this.assessment.answers.planTasksAnswers.tasksToPerform = this.planAnswersConstants.pending.name;
      }
    } else if (key === 'TM-16') {
      if ($event === true) {
        this.assessment.answers.planTasksAnswers.tasksTime = this.planAnswersConstants.answered.name;
      } else {
        this.assessment.answers.planTasksAnswers.tasksTime = this.planAnswersConstants.pending.name;
      }
    } else {
      if ($event === true) {
        this.assessment.answers.planTasksAnswers.criteria = this.planAnswersConstants.answered.name;
      } else {
        this.assessment.answers.planTasksAnswers.criteria = this.planAnswersConstants.pending.name;
      }
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

  verifyParticipantState(key: string) {
    if (key === 'PA-7') {
      return this.assessment.answers.planParticipantsAnswers.howManyParticipants === this.planAnswersConstants.answered.name;
    } else if (key === 'PA-8') {
      return this.assessment.answers.planParticipantsAnswers.participationType === this.planAnswersConstants.answered.name;
    } else if (key === 'PA-9') {
      return this.assessment.answers.planParticipantsAnswers.formCompensation === this.planAnswersConstants.answered.name;
    } else if (key === 'PA-10') {
      return this.assessment.answers.planParticipantsAnswers.eligibilityCriteria === this.planAnswersConstants.answered.name;
    } else if (key === 'PA-11') {
      return this.assessment.answers.planParticipantsAnswers.demographicQuestionnaire === this.planAnswersConstants.answered.name;
    } else if (key === 'PA-12') {
      return this.assessment.answers.planParticipantsAnswers.participantsInstruction === this.planAnswersConstants.answered.name;
    } else {
      return this.assessment.answers.planParticipantsAnswers.askedQuestions === this.planAnswersConstants.answered.name;
    }
  }

  async onSubmit() {
    this.mountTools();
    console.log(this.assessmentToolsDTO);
    (await this.assessmentService.updateAssessmentToolsSection(this.assessmentToolsDTO))
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

  mountTools() {
    console.log(this.assessment);
    console.log(this.assessment.assessmentTools);
    this.assessmentToolsDTO = new AssessmentToolsDTO(
      this.assessment.uid,
      this.tools.getRawValue().map(value => value.tool),
      this.assessment.assessmentTools.toolsUsageDescription,
      this.tasks.getRawValue().map(value => value),
      this.assessment.answers.planTasksAnswers);
    console.log(this.assessmentToolsDTO);
  }

  private newTool(): FormGroup {
    return this.formBuilder.group({tool: ['']});
  }

  private newTask(): FormGroup {
    return this.formBuilder.group({description: [''], taskExecutionTime: [''], acceptanceCriteria: ['']});
  }

}
