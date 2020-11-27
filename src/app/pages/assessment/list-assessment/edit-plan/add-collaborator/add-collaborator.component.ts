import { Component, OnInit } from '@angular/core';
import {CollaboratorDTO} from "../../../../../models/dto/CollaboratorDTO";
import {ToastService} from "../../../../../services/toastService";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AssessmentService} from "../../../../../@core/auth/services/assessment.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../../store";
import {Router} from "@angular/router";
import {NbToastrService} from "@nebular/theme";
import {selectUser} from "../../../../../store/modules/user/user.selectors";

@Component({
  selector: 'ngx-add-collaborator',
  templateUrl: './add-collaborator.component.html',
  styleUrls: ['./add-collaborator.component.scss']
})
export class AddCollaboratorComponent implements OnInit {

  collaborator: CollaboratorDTO;
  userUid: string;
  assessment: any;
  toast: ToastService;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private assessmentService: AssessmentService,
              private store: Store<AppState>,
              private router: Router,
              private toastrService: NbToastrService) {
    this.toast = new ToastService(toastrService);
    this.assessment = this.router.getCurrentNavigation().extras.state;
    this.form = this.formBuilder.group({
      emails: this.formBuilder.array([]),
    });
    this.store.select(selectUser).subscribe(({uid}) => this.userUid = uid);
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

  private newEmail(): FormGroup {
    return this.formBuilder.group({email: ['', [Validators.required, Validators.email]]});
  }

  ngOnInit() {
    this.assessmentService.releaseSection(this.userUid).subscribe();
  }

  addEmail() {
    this.emails.push(this.newEmail());
  }

  removeEmail(i: number) {
    this.emails.removeAt(i);
  }

  async submit() {
    this.collaborator = new CollaboratorDTO(this.assessment.uid,
      this.userUid,
      this.emails.getRawValue().map(value => value.email));
    console.log(this.collaborator);
    (await this.assessmentService.newCollaborator(this.collaborator))
      .subscribe(res => {
          this.toast.showToast('collabAdd', 'top-right', 'success', 'Collaborators');
          console.log(res);
          this.router.navigate(['/pages/assessment/my-plans']);
        },
        () => {
          this.toast.showToast('collabAdd', 'top-right', 'danger', 'collaborators');
        });
  }

}
