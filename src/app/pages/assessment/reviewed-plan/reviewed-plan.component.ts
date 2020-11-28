import {Component, OnInit, TemplateRef} from '@angular/core';
import {LocalDataSource} from "ng2-smart-table";
import {ToastService} from "../../../services/toastService";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store";
import {NbDialogService, NbToastrService} from "@nebular/theme";
import {selectUser} from "../../../store/modules/user/user.selectors";
import {map, switchMap} from "rxjs/operators";
import {ReviewService} from "../../../@core/auth/services/review.service";
import {AssessmentService} from "../../../@core/auth/services/assessment.service";


@Component({
  selector: 'ngx-review-assessment',
  templateUrl: 'reviewed-plan.component.html',
  styleUrls: ['reviewed-plan.component.scss'],
})
export class ReviewedPlanComponent implements OnInit {
  data: any;
  source: LocalDataSource = new LocalDataSource();
  toast: ToastService;
  reviewDelete: any;
  user: any;

  settings = {
    mode: 'external',
    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right',
      custom: [
        {
          name: 'export',
          title: '<i class="nb-arrow-thin-down"></i>',
        },
        {
          name: 'delete',
          title: '<i class="nb-trash"></i>',
        },
      ],
    },
    columns: {
      projectName: {
        title: 'Project Name',
        type: 'string',
      },
      limitReviewDate: {
        title: 'Deadline for review',
        type: 'Date',
      },
      reviewedDate: {
        title: 'Reviewed Date',
        type: 'Date',
      },
      reviewer: {
        title: 'Reviewed by',
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
      switchMap(user => this.reviewService.getReviewedPlanList(user.uid)),
      map(data => {
        if (data !== null)
          this.source.load(data);
      }),
    ).subscribe();
    this.assessmentService.releaseSection(this.user.uid).subscribe();
  }

  onEdit(data: any) {
    this.router.navigate(['/pages/assessment/reviewed-plan/detail'], {state: data});
  }

  async onDelete() {
    (await this.reviewService.deleteReview(this.reviewDelete.reviewUid))
      .subscribe(response => {
          this.toast.showToastr('top-right', 'success', 'Review successfully deleted');
          this.getDataTable();
          this.source.refresh();
        },
        () => {
          this.toast.showToastr('top-right', 'danger', 'Error deleting the review');
        });
  }

  open(dialog: TemplateRef<any>, $event: any) {
    this.reviewDelete = $event.data;
    this.dialogService.open(dialog);
  }

  cancelDelete() {
    this.reviewDelete = null;
  }

  onCustom($event: any, deleteQuestionDialog: TemplateRef<any>) {
    if ($event.action === 'export') {
      this.openDownload($event.data);
    } else {
      this.open(deleteQuestionDialog, $event);
    }
  }

  onUserRowSelect(event): void {
    this.onEdit(event.data);
  }

  openDownload(data: any) {
    this.reviewService.downloadPlanReview(data.reviewUid, data.projectName);
  }
}
