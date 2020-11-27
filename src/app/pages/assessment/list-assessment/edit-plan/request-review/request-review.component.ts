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
  selector: 'ngx-request-review',
  templateUrl: './request-review.component.html',
  styleUrls: ['./request-review.component.scss']
})
export class RequestReviewComponent implements OnInit {

  collaborator: CollaboratorDTO;
  userUid: string;
  assessment: any;
  toast: ToastService;

  constructor(private assessmentService: AssessmentService,
              private store: Store<AppState>,
              private router: Router,
              private toastrService: NbToastrService) {
    this.toast = new ToastService(toastrService);
    this.assessment = this.router.getCurrentNavigation().extras.state;
    this.store.select(selectUser).subscribe(({uid}) => this.userUid = uid);
  }

  ngOnInit() {
    this.assessmentService.releaseSection(this.userUid).subscribe();
  }

  async submit() {
    // this.collaborator = new CollaboratorDTO(this.assessment.uid,
    //   this.userUid,
    // console.log(this.collaborator);
    // (await this.assessmentService.newCollaborator(this.collaborator))
    //   .subscribe(res => {
    //       this.toast.showToast('collabAdd', 'top-right', 'success', 'Collaborators');
    //       console.log(res);
    //       this.router.navigate(['/pages/assessment/my-plans']);
    //     },
    //     () => {
    //       this.toast.showToast('collabAdd', 'top-right', 'danger', 'collaborators');
    //     });
  }


}
