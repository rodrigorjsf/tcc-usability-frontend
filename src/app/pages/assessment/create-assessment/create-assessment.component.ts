import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AssessmentService} from '../../../@core/auth/services/assessment.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store';
import {selectUser} from '../../../store/modules/user/user.selectors';
import {Assessment} from "../../../models/assessment";
import {Router} from "@angular/router";

@Component({
  selector: 'ngx-create-assessment',
  styleUrls: ['./create-assessment.component.scss'],
  templateUrl: './create-assessment.component.html',
})
export class CreateAssessmentComponent implements OnInit {
  form: FormGroup;
  uid: string;
  assessment: Assessment;
  constructor (private formBuilder: FormBuilder, private assessmentService: AssessmentService,
               private store: Store<AppState>,
               private router: Router) {
    this.store.select(selectUser).subscribe(({ uid }) => this.uid = uid);
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      userUid: [this.uid, Validators.required],
      projectName: [null, [Validators.required]],
      projectDescription: [null, Validators.required],
      emails: this.formBuilder.array([]),
    });
  }

  private newEmail(): FormGroup {
    return this.formBuilder.group({ email: ['', [ Validators.required, Validators.email ]] });
  }

  addEmail() {
    this.emails.push(this.newEmail());
  }

  removeEmail(i: number) {
    this.emails.removeAt(i);
  }

  addCollaboratorFlag() {
  }

  async create() {
    (await this.assessmentService.createNewAssessment(this.serializedValues))
      .subscribe(data => {
        this.assessment = data;
        console.log(this.assessment);
        this.router.navigate(['/pages/assessment/my-plans']);
      });
  }

  get isValid() {
    return this.form.valid;
  }

  get emails() {
    return this.form.controls.emails as FormArray;
  }

  get hasCollaborator() {
    return this.form.controls.emails.value?.length !== 0;
  }

  get values() {
    return this.form.value;
  }

  get serializedValues() {
    const serialized = { ...this.values, collaboratorsEmail: this.values.emails.map(email => email.email) };
    delete serialized.emails;
    return serialized;
  }
}
