import {Component, OnInit, TemplateRef} from '@angular/core';
import {LocalDataSource} from "ng2-smart-table";
import {ToastService} from "../../services/toastService";
import {AssessmentService} from "../../@core/auth/services/assessment.service";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "../../store";
import {NbDialogService, NbToastrService} from "@nebular/theme";
import {selectUser} from "../../store/modules/user/user.selectors";
import {map, switchMap} from "rxjs/operators";
import {DownloadPlanDialogComponent} from "../modal/download-plan-dialog/download-plan-dialog.component";
import {ReviewService} from "../../@core/auth/services/review.service";

@Component({
  selector: 'ngx-sugested-scales',
  templateUrl: './review-request.component.html',
  styleUrls: ['./review-request.component.scss'],
})
export class ReviewRequestComponent implements OnInit{

  data: any;
  source: LocalDataSource = new LocalDataSource();
  toast: ToastService;
  assessmentDelete: any;
  user: any;

  settings = {
    mode: 'external',
    noDataMessage: 'No revisions were found to be made',
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      projectName: {
        title: 'Name',
        type: 'string',
      },
      limitReviewDate: {
        title: 'Review Limit Date',
        type: 'date',
      },
      reviewStatus: {
        title: 'Status',
        type: 'string',
      },
    },
  };

  constructor(private assessmentService: AssessmentService,
              private reviewService: ReviewService,
              private router: Router,
              private store: Store<AppState>,
              private dialogService: NbDialogService,
              private toastrService: NbToastrService) {
    this.toast = new ToastService(toastrService);
    this.store.select(selectUser).subscribe(user => this.user = user);
  }

  ngOnInit() {
    this.getDataTable();
  }

  getDataTable() {
    this.store.select(selectUser).pipe(
      switchMap(user => this.reviewService.getAvailableReviews(user.uid)),
      map(data => {
        if (data !== null)
          this.source.load(data);
      }),
    ).subscribe();
    this.assessmentService.releaseSection(this.user.uid).subscribe();
  }

  onReview(data: any) {
    console.log(data);
    this.router.navigate(['/pages/review-request/review'], {state: data});
  }

  async onDelete() {
    (await this.assessmentService.deleteAssessment(this.assessmentDelete.assessmentUid))
      .subscribe(response => {
          this.toast.showToast('delete', 'top-right', 'success', 'Assessment');
          this.getDataTable();
          this.source.refresh();
        },
        () => {
          this.toast.showToast('delete', 'top-right', 'danger', 'Assessment');
        });
  }

  open(dialog: TemplateRef<any>, $event: any) {
    this.assessmentDelete = $event.data;
    this.dialogService.open(dialog);
  }

  cancelDelete() {
    this.assessmentDelete = null;
  }

  onCustom($event: any, deleteQuestionDialog: TemplateRef<any>) {
    if ($event.action === 'export') {
      this.openDownload($event.data);
    } else {
      this.open(deleteQuestionDialog, $event);
    }
  }

  onUserRowSelect(event): void {
    this.onReview(event.data);
  }

  openDownload(data: any) {
    this.dialogService.open(DownloadPlanDialogComponent, {
      context: {
        title: 'Choose the method you want to export',
        assessmentUid: data.assessmentUid,
        projectName: data.projectName,
      },
    });
  }
}
