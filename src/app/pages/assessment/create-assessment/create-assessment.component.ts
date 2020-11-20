import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Assessment} from '../../../models/assessment';
import {SmartCityForm} from "../../../models/smartCityForm";

@Component({
  selector: 'ngx-create-assessment',
  styleUrls: ['./create-assessment.component.scss'],
  templateUrl: './create-assessment.component.html',
})
export class CreateAssessmentComponent implements OnInit {

  assessment: Assessment;
  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.assessment = new Assessment();
    this.assessment.smartForm = new SmartCityForm();
    this.firstForm = this.fb.group({
      projectName: ['', Validators.required],
      projectDescription: ['', Validators.required],
      hasDataManagement: [''],
      hasAppExecutionEnv: [''],
      hasSensorNetwork: [''],
      hasDataProcessing: [''],
      hasDataAccess: [''],
      hasServiceManagement: [''],
      hasSoftwareTools: [''],
    });

    this.secondForm = this.fb.group({
      secondCtrl: ['', Validators.required],
    });

    this.thirdForm = this.fb.group({
      thirdCtrl: ['', Validators.required],
    });
  }

  onFirstSubmit() {
    this.firstForm.markAsDirty();
  }

  onSecondSubmit() {
    this.secondForm.markAsDirty();
  }

  onThirdSubmit() {
    this.thirdForm.markAsDirty();
  }
}
