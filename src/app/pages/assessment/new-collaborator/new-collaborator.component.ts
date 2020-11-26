import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AssessmentService} from "../../../@core/auth/services/assessment.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store";
import {Router} from "@angular/router";
import {CollaboratorDTO} from "../../../models/dto/CollaboratorDTO";
import {selectUser} from "../../../store/modules/user/user.selectors";
import {NbToastrService} from "@nebular/theme";
import {ToastService} from "../../../services/toastService";

@Component({
  selector: 'ngx-new-collaborator',
  templateUrl: './new-collaborator.component.html',
  styleUrls: ['./new-collaborator.component.scss']
})
export class NewCollaboratorComponent {

  collaborator: CollaboratorDTO;
  userUid: string;
  assessmentUid: any;
  toast: ToastService;


  constructor(private formBuilder: FormBuilder, private assessmentService: AssessmentService,
              private store: Store<AppState>,
              private router: Router,
              private toastrService: NbToastrService) {
    this.toast = new ToastService(toastrService);
    this.store.select(selectUser).subscribe(({uid}) => this.userUid = uid);
  }

  get isValid() {
    return !(this.assessmentUid === null || this.assessmentUid === undefined);
  }

  async submit() {
    this.collaborator = new CollaboratorDTO(this.assessmentUid, this.userUid, []);
    console.log(this.collaborator);
    (await this.assessmentService.enterAsCollaborator(this.collaborator))
      .subscribe(res => {
          this.toast.showToast('collab', 'top-right', 'success', 'Collaborator');
          console.log(res);
          this.router.navigate(['/pages/home']);
        },
        () => {
          this.toast.showToast('collab', 'top-right', 'danger', 'Collaborator');
        });
  }
}
