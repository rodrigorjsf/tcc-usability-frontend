import {Component, OnInit, TemplateRef} from '@angular/core';
import {Assessment} from '../../../../models/assessment';
import {AssessmentService} from '../../../../@core/auth/services/assessment.service';
import {Router} from '@angular/router';
import {QuestionService} from '../../../../@core/auth/services/question.service';
import {VuatConstants} from '../../../../models/constants/vuat-constants';
import {
  AssessmentData,
  AssessmentProcedure,
  AssessmentThreat,
  AssessmentTools,
  Participant,
  Scale,
  SmartCityQuestionnaire,
  UsabilityGoal,
  Variable
} from "../../../../models/AssessmentSections";
import {PlanAnswers} from "../../../../models/assessment-answers";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {NbDialogService, NbToastrService} from "@nebular/theme";
import {ToastService} from "../../../../services/toastService";

@Component({
  selector: 'ngx-edit-plan',
  templateUrl: './edit-plan.component.html',
  styleUrls: ['./edit-plan.component.scss'],
})
export class EditPlanComponent implements OnInit {

  form: FormGroup;
  formEditable = false;
  assessment: Assessment;
  router: Router;
  isVald = false;
  planInfo: any;
  dataloaded: Promise<boolean>;
  questionsAnswered = 0;
  questionsPercentage: number;
  planPercentage: number;
  data: any;
  usabilityScales: Scale[];
  tooltipTrigger: string;
  submitTooltip: string;
  private readonly instrumentQuestions = VuatConstants.PLAN_QUESTIONS;
  private readonly planAnswersConstants = VuatConstants.PLAN_ANSWER;
  private readonly usabilityAtributes = VuatConstants.USABILITY_ATRIBUTES;
  private categories = VuatConstants.CATEGORIES;
  private smartCityCategories = VuatConstants.SMART_CITY_CATEGORY;
  private genericSelectOptions = VuatConstants.GENERIC_SELECT_OPTIONS;
  private selectOptions = VuatConstants.SELECT_OPTIONS;
  smartCityQuestionnaire: SmartCityQuestionnaire;
  toast: ToastService;

  constructor(private assessmentService: AssessmentService,
              private questionService: QuestionService,
              router: Router,
              private formBuilder: FormBuilder,
              private dialogService: NbDialogService,
              private toastrService: NbToastrService) {
    this.toast = new ToastService(toastrService);
    this.router = router;
    this.planInfo = this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit() {
    this.assessment = new Assessment();
    this.assessmentService.getAssessmentByUid(this.planInfo.assessmentUid)
      .subscribe(data => {
        this.assessment = data;
        this.calculatePlanPercentage();
        this.initQuestionnaire();
        this.initGoals();
        this.initAnswers();
        this.initAssessmentAttribute();
        this.initParticipants();
        this.initAssessmentTools();
        this.initProcedure();
        this.initDataCollection();
        this.initThreats();
        console.log(this.assessment);
        this.dataloaded = Promise.resolve(true);
      });
    this.form = this.formBuilder.group({
      questions: this.formBuilder.array([]),
      tools: this.formBuilder.array([]),
      tasks: this.formBuilder.array([]),
      steps: this.formBuilder.array([]),
      threats: this.formBuilder.array([]),
      limitations: this.formBuilder.array([]),
    });
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
  }

  initParticipants() {
    if (this.isNullOrUndefined(this.assessment.participant)) {
      this.assessment.participant = new Participant();
    }
    if (this.assessment.participant.questions.length !== 0)
      this.assessment.participant.questions.map(value => this.formBuilder.group({question: [value]}));
  }

  initAssessmentAttribute() {
    if (this.isNullOrUndefined(this.assessment.variables) || this.assessment.variables.length === 0) {
      this.usabilityAtributes.forEach(value => this.assessment.variables.push(new Variable(value)));
    }
    if (this.isNullOrUndefined(this.assessment.scale) || this.assessment.scale.length === 0) {
      this.assessment.scale = [];
    }
  }

  initAssessmentTools() {
    if (this.isNullOrUndefined(this.assessment.assessmentTools)) {
      this.assessment.assessmentTools = new AssessmentTools();
    }
    if (this.assessment.assessmentTools.tools.length !== 0)
      this.assessment.assessmentTools.tools.map(value => this.formBuilder.group({tool: [value]}));

    if (this.assessment.assessmentTools.tasks.length !== 0) {
      this.assessment.assessmentTools.tasks.map(value =>
        this.formBuilder.group({
          description: [value.description],
          taskExecutionTime: [value.taskExecutionTime],
          acceptanceCriteria: [value.acceptanceCriteria]
        }));
    }
  }

  initAnswers() {
    if (this.isNullOrUndefined(this.assessment.answers))
      this.assessment.answers = new PlanAnswers();
  }

  initProcedure() {
    if (this.isNullOrUndefined(this.assessment.assessmentProcedure))
      this.assessment.assessmentProcedure = new AssessmentProcedure();
  }

  initDataCollection() {
    if (this.isNullOrUndefined(this.assessment.assessmentData))
      this.assessment.assessmentData = new AssessmentData();
  }

  initThreats() {
    if (this.isNullOrUndefined(this.assessment.assessmentThreat))
      this.assessment.assessmentThreat = new AssessmentThreat();
  }

  getCharacterizationQuestionsObject(key: string): any {
    return this.instrumentQuestions.find(item => item['key'] === key);
  }

  onClickApplication(section: string) {
    if (this.assessment.smartCityQuestionnaire === null || this.assessment.smartCityQuestionnaire === undefined) {
      this.assessment.smartCityQuestionnaire = new SmartCityQuestionnaire(null, null,
        null, null, null, null, null, null);
    }
    this.calculateProgressPercentage(section);
    if (section === this.categories.variables.acronym) {
      this.getUsabilityScales();
    }
  }

  getUsabilityScales() {
    this.assessmentService.getScaleList()
      .subscribe(scaleData => {
        this.usabilityScales = scaleData;
        console.log(this.usabilityScales);
      });
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

  checkUsabilityGoal($event: boolean, usabilityGoal: UsabilityGoal) {
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
  }

  checkApplicationSection($event: boolean, key: string, projectDescription: string) {
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
  }

  ApplicationSectionCheckboxStatus(answer: any): boolean {
    return answer === this.planAnswersConstants.answered.name;
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
    return this.formEditable !== true;
  }

  showValue(object: any): any {
    if (this.isNullOrUndefined(object))
      return '';
    return object;
  }


  // showQuestions() {
  //   this.questions.getRawValue().forEach(value => console.log(value.question));
  //   console.log(this.values.questions);
  //   const arrayTest = this.questions.getRawValue().map(value => value.question);
  //   console.log(arrayTest);
  // }

  private newQuestion(): FormGroup {
    return this.formBuilder.group({question: ['']});
  }

  addQuestion() {
    if (this.newQuestion().getRawValue() !== '')
      this.questions.push(this.newQuestion());
    console.log(this.serializedValues);
  }

  removeQuestion(i: number) {
    this.questions.removeAt(i);
  }

  get questions() {
    return this.form.controls.questions as FormArray;
  }

  get values() {
    return this.form.value;
  }

  get serializedValues() {
    const serialized = {...this.values, planQuestions: this.values.questions.map(question => question.question)};
    console.log(serialized);
    delete serialized.questions;
    return serialized;
  }

  // --------------------- TASKS SECTION -------------------------
  private newTool(): FormGroup {
    return this.formBuilder.group({tool: ['']});
  }

  addTools() {
    if (this.newTool().getRawValue() !== '')
      this.tools.push(this.newTool());
    console.log(this.serializedValues);
  }

  removeTool(i: number) {
    this.tools.removeAt(i);
  }

  get tools() {
    return this.form.controls.tools as FormArray;
  }

  private newTask(): FormGroup {
    return this.formBuilder.group({description: [''], taskExecutionTime: [''], acceptanceCriteria: ['']});
  }

  addTasks() {
    if (this.newTask().getRawValue() !== '')
      this.tasks.push(this.newTask());
    console.log(this.serializedValues);
  }

  removeTask(i: number) {
    this.tasks.removeAt(i);
  }

  get tasks() {
    return this.form.controls.tasks as FormArray;
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

  // --------------------- PROCEDURE SECTION -------------------------
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
    console.log(this.serializedValues);
  }

  removeSteps(i: number) {
    this.steps.removeAt(i);
  }

  get steps() {
    return this.form.controls.steps as FormArray;
  }

  // ----------------- DATA SECTION ---------------------

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

  // ----------------- THREATS SECTION ---------------
  private newThreat(): FormGroup {
    return this.formBuilder.group({threat: ['']});
  }

  addThreats() {
    if (this.newThreat().getRawValue() !== '')
      this.threats.push(this.newThreat());
  }

  removeThreat(i: number) {
    this.steps.removeAt(i);
  }

  get threats() {
    return this.form.controls.threats as FormArray;
  }

  private newLimitation(): FormGroup {
    return this.formBuilder.group({limitation: ['']});
  }

  addLimitation() {
    if (this.newLimitation().getRawValue() !== '')
      this.limitations.push(this.newLimitation());
  }

  removeLimitation(i: number) {
    this.limitations.removeAt(i);
  }

  get limitations() {
    return this.form.controls.limitations as FormArray;
  }

  verifyThreatState(key: string) {
    if (key === 'DT-22') {
      return this.assessment.answers.planDataAnswers.dataCollectionProcedure === this.planAnswersConstants.answered.name;
    } else if (key === 'DT-23') {
      return this.assessment.answers.planDataAnswers.dataCollectedAnalyzed === this.planAnswersConstants.answered.name;
    } else {
      return this.assessment.answers.planDataAnswers.statisticalMethods === this.planAnswersConstants.answered.name;
    }
  }

  checkThreatQuestion($event: boolean, key: string) {
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

  getPercentageColor(): string {
    if (this.questionsPercentage <= 25)
      return 'danger';
    else if (this.questionsPercentage > 40 && this.questionsPercentage <= 70)
      return 'warning';
    else if (this.questionsPercentage > 70 && this.questionsPercentage <= 99)
      return 'primary';
    else
      return 'success';
  }

  getPlanPercentageColor(): string {
    if (this.planPercentage <= 25)
      return 'danger';
    else if (this.planPercentage > 40 && this.planPercentage <= 70)
      return 'warning';
    else if (this.planPercentage > 70 && this.planPercentage <= 99)
      return 'primary';
    else
      return 'success';
  }

  calculateProgressPercentage(section: string) {
    this.questionsPercentage = 0;
    this.questionsAnswered = 0;
    let questionQuantity;
    if (this.categories.application.acronym === section) {
      questionQuantity = 11;
      if (this.assessment.answers.planApplicationAnswers.projectName === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planApplicationAnswers.projectDescription === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planApplicationAnswers.applicationExecution ===
        this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planApplicationAnswers.dataAccess === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planApplicationAnswers.dataManagement === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planApplicationAnswers.dataProcessing === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planApplicationAnswers.definingCityModel === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planApplicationAnswers.sensorNetwork === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planApplicationAnswers.serviceManagement === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planApplicationAnswers.smartCityPercentage ===
        this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planApplicationAnswers.tools === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
    } else if (this.categories.goals.acronym === section) {
      questionQuantity = 5;
      if (this.assessment.answers.planGoalsAnswers.learnability === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planGoalsAnswers.satisfaction === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planGoalsAnswers.errorRate === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planGoalsAnswers.userRetentionOverTime === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planGoalsAnswers.efficiency === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
    } else if (this.categories.variables.acronym === section) {
      questionQuantity = 11;
      if (this.assessment.answers.planVariableAnswers.learnabilityAtt === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planVariableAnswers.satisfactionAtt === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planVariableAnswers.errorRateAtt === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planVariableAnswers.userRetentionOverTimeAtt === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planVariableAnswers.efficiencyAtt === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planVariableAnswers.satisfactionMeth === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planVariableAnswers.errorRateMeth === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planVariableAnswers.userRetentionOverTimeMeth === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planVariableAnswers.efficiencyMeth === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planVariableAnswers.learnabilityMeth === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planVariableAnswers.suggestedScales === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
    } else if (this.categories.participants.acronym === section) {
      questionQuantity = 7;
      if (this.assessment.answers.planParticipantsAnswers.howManyParticipants === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planParticipantsAnswers.participationType === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planParticipantsAnswers.formCompensation === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planParticipantsAnswers.eligibilityCriteria === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planParticipantsAnswers.demographicQuestionnaire === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planParticipantsAnswers.participantsInstruction === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planParticipantsAnswers.askedQuestions === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
    } else if (this.categories.tasks.acronym === section) {
      questionQuantity = 4;
      if (this.assessment.answers.planTasksAnswers.usedTools === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planTasksAnswers.tasksToPerform === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planTasksAnswers.tasksTime === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planTasksAnswers.criteria === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
    } else if (this.categories.procedure.acronym === section) {
      questionQuantity = 7;
      if (this.assessment.answers.planProcedureAnswers.whenOccur === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planProcedureAnswers.whereOccur === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planProcedureAnswers.howOccur === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planProcedureAnswers.howMuchTime === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planProcedureAnswers.assessmentProcedureSteps === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planProcedureAnswers.questionsAllowed === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planProcedureAnswers.isPilotAssessment === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
    } else if (this.categories.data.acronym === section) {
      questionQuantity = 3;
      if (this.assessment.answers.planDataAnswers.statisticalMethods === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planDataAnswers.dataCollectedAnalyzed === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planDataAnswers.dataCollectionProcedure === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
    } else {
      questionQuantity = 5;
      if (this.assessment.answers.planThreatsAnswers.assessmentBiases === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planThreatsAnswers.assessmentLimitations === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planThreatsAnswers.ethicalAspects === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planThreatsAnswers.threatsValidityControlled === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
      if (this.assessment.answers.planThreatsAnswers.whatThreats === this.planAnswersConstants.answered.name)
        this.questionsAnswered = this.questionsAnswered + 1;
    }
    const calculatedPercentage = +((this.questionsAnswered * 100) / questionQuantity).toFixed(1);
    this.questionsPercentage = calculatedPercentage > 100 ? 100 : calculatedPercentage;
  }

  calculatePlanPercentage() {
    this.planPercentage = 0;
    this.questionsAnswered = 0;
    const questionQuantity = 53;
    if (this.assessment.answers.planApplicationAnswers.projectName === this.planAnswersConstants.answered.name)
      this.questionsAnswered = this.questionsAnswered + 1;
    if (this.assessment.answers.planApplicationAnswers.projectDescription === this.planAnswersConstants.answered.name)
      this.questionsAnswered = this.questionsAnswered + 1;
    if (this.assessment.answers.planApplicationAnswers.applicationExecution ===
      this.planAnswersConstants.answered.name)
      this.questionsAnswered = this.questionsAnswered + 1;
    if (this.assessment.answers.planApplicationAnswers.dataAccess === this.planAnswersConstants.answered.name)
      this.questionsAnswered = this.questionsAnswered + 1;
    if (this.assessment.answers.planApplicationAnswers.dataManagement === this.planAnswersConstants.answered.name)
      this.questionsAnswered = this.questionsAnswered + 1;
    if (this.assessment.answers.planApplicationAnswers.dataProcessing === this.planAnswersConstants.answered.name)
      this.questionsAnswered = this.questionsAnswered + 1;
    if (this.assessment.answers.planApplicationAnswers.definingCityModel === this.planAnswersConstants.answered.name)
      this.questionsAnswered = this.questionsAnswered + 1;
    if (this.assessment.answers.planApplicationAnswers.sensorNetwork === this.planAnswersConstants.answered.name)
      this.questionsAnswered = this.questionsAnswered + 1;
    if (this.assessment.answers.planApplicationAnswers.serviceManagement === this.planAnswersConstants.answered.name)
      this.questionsAnswered = this.questionsAnswered + 1;
    if (this.assessment.answers.planApplicationAnswers.smartCityPercentage ===
      this.planAnswersConstants.answered.name)
      this.questionsAnswered = this.questionsAnswered + 1;
    if (this.assessment.answers.planApplicationAnswers.tools === this.planAnswersConstants.answered.name)
      this.questionsAnswered = this.questionsAnswered + 1;
    if (this.assessment.answers.planGoalsAnswers.learnability === this.planAnswersConstants.answered.name)
      this.questionsAnswered = this.questionsAnswered + 1;
    if (this.assessment.answers.planGoalsAnswers.satisfaction === this.planAnswersConstants.answered.name)
      this.questionsAnswered = this.questionsAnswered + 1;
    if (this.assessment.answers.planGoalsAnswers.errorRate === this.planAnswersConstants.answered.name)
      this.questionsAnswered = this.questionsAnswered + 1;
    if (this.assessment.answers.planGoalsAnswers.userRetentionOverTime === this.planAnswersConstants.answered.name)
      this.questionsAnswered = this.questionsAnswered + 1;
    if (this.assessment.answers.planGoalsAnswers.efficiency === this.planAnswersConstants.answered.name)
      this.questionsAnswered = this.questionsAnswered + 1;
    if (this.assessment.answers.planVariableAnswers.learnabilityAtt === this.planAnswersConstants.answered.name)
      this.questionsAnswered = this.questionsAnswered + 1;
    if (this.assessment.answers.planVariableAnswers.satisfactionAtt === this.planAnswersConstants.answered.name)
      this.questionsAnswered = this.questionsAnswered + 1;
    if (this.assessment.answers.planVariableAnswers.errorRateAtt === this.planAnswersConstants.answered.name)
      this.questionsAnswered = this.questionsAnswered + 1;
    if (this.assessment.answers.planVariableAnswers.userRetentionOverTimeAtt
      === this.planAnswersConstants.answered.name)
      this.questionsAnswered = this.questionsAnswered + 1;
    if (this.assessment.answers.planVariableAnswers.efficiencyAtt === this.planAnswersConstants.answered.name)
      this.questionsAnswered = this.questionsAnswered + 1;
    if (this.assessment.answers.planVariableAnswers.satisfactionMeth === this.planAnswersConstants.answered.name)
      this.questionsAnswered = this.questionsAnswered + 1;
    if (this.assessment.answers.planVariableAnswers.errorRateMeth === this.planAnswersConstants.answered.name)
      this.questionsAnswered = this.questionsAnswered + 1;
    if (this.assessment.answers.planVariableAnswers.userRetentionOverTimeMeth
      === this.planAnswersConstants.answered.name)
      this.questionsAnswered = this.questionsAnswered + 1;
    if (this.assessment.answers.planVariableAnswers.efficiencyMeth === this.planAnswersConstants.answered.name)
      this.questionsAnswered = this.questionsAnswered + 1;
    if (this.assessment.answers.planVariableAnswers.learnabilityMeth === this.planAnswersConstants.answered.name)
      this.questionsAnswered = this.questionsAnswered + 1;
    if (this.assessment.answers.planVariableAnswers.suggestedScales === this.planAnswersConstants.answered.name)
      this.questionsAnswered = this.questionsAnswered + 1;
    if (this.assessment.answers.planParticipantsAnswers.howManyParticipants === this.planAnswersConstants.answered.name)
      this.questionsAnswered = this.questionsAnswered + 1;
    if (this.assessment.answers.planParticipantsAnswers.participationType === this.planAnswersConstants.answered.name)
      this.questionsAnswered = this.questionsAnswered + 1;
    if (this.assessment.answers.planParticipantsAnswers.formCompensation === this.planAnswersConstants.answered.name)
      this.questionsAnswered = this.questionsAnswered + 1;
    if (this.assessment.answers.planParticipantsAnswers.eligibilityCriteria === this.planAnswersConstants.answered.name)
      this.questionsAnswered = this.questionsAnswered + 1;
    if (this.assessment.answers.planParticipantsAnswers.demographicQuestionnaire
      === this.planAnswersConstants.answered.name)
      this.questionsAnswered = this.questionsAnswered + 1;
    if (this.assessment.answers.planParticipantsAnswers.participantsInstruction
      === this.planAnswersConstants.answered.name)
      this.questionsAnswered = this.questionsAnswered + 1;
    if (this.assessment.answers.planParticipantsAnswers.askedQuestions === this.planAnswersConstants.answered.name)
      this.questionsAnswered = this.questionsAnswered + 1;
    if (this.assessment.answers.planTasksAnswers.usedTools === this.planAnswersConstants.answered.name)
      this.questionsAnswered = this.questionsAnswered + 1;
    if (this.assessment.answers.planTasksAnswers.tasksToPerform === this.planAnswersConstants.answered.name)
      this.questionsAnswered = this.questionsAnswered + 1;
    if (this.assessment.answers.planTasksAnswers.tasksTime === this.planAnswersConstants.answered.name)
      this.questionsAnswered = this.questionsAnswered + 1;
    if (this.assessment.answers.planTasksAnswers.criteria === this.planAnswersConstants.answered.name)
      this.questionsAnswered = this.questionsAnswered + 1;
    if (this.assessment.answers.planProcedureAnswers.whenOccur === this.planAnswersConstants.answered.name)
      this.questionsAnswered = this.questionsAnswered + 1;
    if (this.assessment.answers.planProcedureAnswers.whereOccur === this.planAnswersConstants.answered.name)
      this.questionsAnswered = this.questionsAnswered + 1;
    if (this.assessment.answers.planProcedureAnswers.howOccur === this.planAnswersConstants.answered.name)
      this.questionsAnswered = this.questionsAnswered + 1;
    if (this.assessment.answers.planProcedureAnswers.howMuchTime === this.planAnswersConstants.answered.name)
      this.questionsAnswered = this.questionsAnswered + 1;
    if (this.assessment.answers.planProcedureAnswers.assessmentProcedureSteps
      === this.planAnswersConstants.answered.name)
      this.questionsAnswered = this.questionsAnswered + 1;
    if (this.assessment.answers.planProcedureAnswers.questionsAllowed === this.planAnswersConstants.answered.name)
      this.questionsAnswered = this.questionsAnswered + 1;
    if (this.assessment.answers.planProcedureAnswers.isPilotAssessment === this.planAnswersConstants.answered.name)
      this.questionsAnswered = this.questionsAnswered + 1;
    if (this.assessment.answers.planDataAnswers.statisticalMethods === this.planAnswersConstants.answered.name)
      this.questionsAnswered = this.questionsAnswered + 1;
    if (this.assessment.answers.planDataAnswers.dataCollectedAnalyzed === this.planAnswersConstants.answered.name)
      this.questionsAnswered = this.questionsAnswered + 1;
    if (this.assessment.answers.planDataAnswers.dataCollectionProcedure === this.planAnswersConstants.answered.name)
      this.questionsAnswered = this.questionsAnswered + 1;
    if (this.assessment.answers.planThreatsAnswers.assessmentBiases === this.planAnswersConstants.answered.name)
      this.questionsAnswered = this.questionsAnswered + 1;
    if (this.assessment.answers.planThreatsAnswers.assessmentLimitations === this.planAnswersConstants.answered.name)
      this.questionsAnswered = this.questionsAnswered + 1;
    if (this.assessment.answers.planThreatsAnswers.ethicalAspects === this.planAnswersConstants.answered.name)
      this.questionsAnswered = this.questionsAnswered + 1;
    if (this.assessment.answers.planThreatsAnswers.threatsValidityControlled
      === this.planAnswersConstants.answered.name)
      this.questionsAnswered = this.questionsAnswered + 1;
    if (this.assessment.answers.planThreatsAnswers.whatThreats === this.planAnswersConstants.answered.name)
      this.questionsAnswered = this.questionsAnswered + 1;
    const calculatedPercentage = +((this.questionsAnswered * 100) / questionQuantity).toFixed(1);
    this.planPercentage = calculatedPercentage > 100 ? 100 : calculatedPercentage;
  }

  setSubmitTooltipTrigger() {
    if (this.planPercentage !== 100) {
      this.submitTooltip = 'hint';
    }
    this.submitTooltip = 'noop';
  }

  isPlanNotDone(): boolean {
    return this.planPercentage !== 100;
  }

  onEditApplication() {
    this.router.navigate(['/pages/assessment/my-plans/edit/application'], {state: this.assessment});
  }

  onEditGoals() {
    this.router.navigate(['/pages/assessment/my-plans/edit/goal'], {state: this.assessment});
  }

  onEditVariables() {
    this.router.navigate(['/pages/assessment/my-plans/edit/variable'], {state: this.assessment});
  }
}
