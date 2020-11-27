import {Component, OnInit, TemplateRef} from '@angular/core';
import {LocalDataSource} from "ng2-smart-table";
import {ToastService} from "../../../services/toastService";
import {AssessmentService} from "../../../@core/auth/services/assessment.service";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store";
import {NbDialogService, NbToastrService} from "@nebular/theme";
import {selectUser} from "../../../store/modules/user/user.selectors";
import {map, switchMap} from "rxjs/operators";
import {DownloadPlanDialogComponent} from "../../modal/download-plan-dialog/download-plan-dialog.component";
import {ReviewService} from "../../../@core/auth/services/review.service";


@Component({
  selector: 'ngx-review-assessment',
  templateUrl: 'reviewed-plan.component.html',
  styleUrls: ['reviewed-plan.component.scss'],
})
export class ReviewedPlanComponent implements OnInit {


  constructor() {
  }

  ngOnInit(): void {
    }

// data: any;
  // toast: ToastService;
  // user: any;
  //
  // constructor(private reviewService: ReviewService,
  //             private router: Router,
  //             private store: Store<AppState>,
  //             private dialogService: NbDialogService,
  //             private toastrService: NbToastrService) {
  //   this.toast = new ToastService(toastrService);
  //   this.store.select(selectUser).subscribe(user => this.user = user);
  // }
  //
  // ngOnInit() {
  //   this.getDataTable();
  // }
  //
  // getDataTable() {
  //   this.store.select(selectUser).pipe(
  //     switchMap(user => this.assessmentService.getUserAssessments(user.uid)),
  //     map(data => {
  //       if (data !== null)
  //         this.source.load(data);
  //     }),
  //   ).subscribe();
  //   this.assessmentService.releaseSection(this.user.uid).subscribe();
  // }
  //
  // onEdit(data: any) {
  //   this.router.navigate(['/pages/assessment/my-plans/edit'], {state: data});
  // }
  //
  // async onDelete() {
  //   (await this.assessmentService.deleteAssessment(this.assessmentDelete.assessmentUid))
  //     .subscribe(response => {
  //         this.toast.showToast('delete', 'top-right', 'success', 'Assessment');
  //         this.getDataTable();
  //         this.source.refresh();
  //       },
  //       () => {
  //         this.toast.showToast('delete', 'top-right', 'danger', 'Assessment');
  //       });
  // }
  //
  // open(dialog: TemplateRef<any>, $event: any) {
  //   this.assessmentDelete = $event.data;
  //   this.dialogService.open(dialog);
  // }
  //
  // cancelDelete() {
  //   this.assessmentDelete = null;
  // }
  //
  // onCustom($event: any, deleteQuestionDialog: TemplateRef<any>) {
  //   if ($event.action === 'export') {
  //     this.openDownload($event.data);
  //   } else {
  //     this.open(deleteQuestionDialog, $event);
  //   }
  // }
  //
  // onUserRowSelect(event): void {
  //   this.onEdit(event.data);
  // }
  //
  // openDownload(data: any) {
  //   this.dialogService.open(DownloadPlanDialogComponent, {
  //     context: {
  //       title: 'Choose the method you want to export',
  //       assessmentUid: data.assessmentUid,
  //       projectName: data.projectName,
  //     },
  //   });
  // }
}
