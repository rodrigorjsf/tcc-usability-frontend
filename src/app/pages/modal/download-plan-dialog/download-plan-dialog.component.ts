import {Component, Input} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {AssessmentService} from "../../../@core/auth/services/assessment.service";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SendMailRequest} from "../../../models/dto/SendMailRequest";

@Component({
  selector: 'ngx-download-plan-dialog',
  templateUrl: './download-plan-dialog.component.html',
  styleUrls: ['./download-plan-dialog.component.scss']
})
export class DownloadPlanDialogComponent {

  @Input() title: string;
  @Input() assessmentUid: string;
  @Input() projectName: string;
  showEmailForm = false;
  form: FormGroup;
  sendMailRequest: SendMailRequest;

  constructor(protected ref: NbDialogRef<DownloadPlanDialogComponent>,
              private assessmentService: AssessmentService,
              private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      emails: this.formBuilder.array([]),
    });
  }

  dismiss() {
    this.ref.close();
  }

  downloadFile() {
    this.assessmentService.downloadPlan(this.assessmentUid, this.projectName);
    this.ref.close();
  }

  enableEmail() {
    this.showEmailForm = true;
  }

  get isValid() {
    return this.form.valid;
  }

  get emails() {
    return this.form.controls.emails as FormArray;
  }

  get hasEmail() {
    return this.form.controls.emails.value?.length !== 0;
  }

  get values() {
    return this.form.value;
  }

  addEmail() {
    this.emails.push(this.newEmail());
  }

  removeEmail(i: number) {
    this.emails.removeAt(i);
  }

  private newEmail(): FormGroup {
    return this.formBuilder.group({email: ['', [Validators.required, Validators.email]]});
  }

  sendMail() {
    const emails = this.emails.getRawValue().map(value => value.email);
    this.sendMailRequest = new SendMailRequest(this.assessmentUid, emails);

    this.assessmentService.sendPlanToEmail(this.sendMailRequest);
    this.ref.close();
  }
}
