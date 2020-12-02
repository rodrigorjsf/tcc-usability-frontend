import {Component, OnInit, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {LocalDataSource} from 'ng2-smart-table';
import {AssessmentService} from '../../../@core/auth/services/assessment.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store';
import {selectUser} from '../../../store/modules/user/user.selectors';
import {map, switchMap} from 'rxjs/operators';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {ToastService} from '../../../services/toastService';
import {DownloadPlanDialogComponent} from '../../modal/download-plan-dialog/download-plan-dialog.component';

@Component({
  selector: 'ngx-list-assessment',
  styleUrls: ['./list-assessment.component.scss'],
  templateUrl: './list-assessment.component.html',
})
export class ListAssessmentComponent implements OnInit {

  data: any;
  source: LocalDataSource = new LocalDataSource();
  toast: ToastService;
  assessmentDelete: any;
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
          name: 'dashboard',
          title: '<i style="display: flex" class="nb-tables"></i>',
        },
        {
          name: 'export',
          title: '<i style="display: flex" class="nb-arrow-thin-down"></i>',
        },
        {
          name: 'delete',
          title: '<i style="display: flex" class="nb-trash"></i>',
        },
      ],
    },
    columns: {
      projectName: {
        title: 'Name',
        type: 'string',
      },
      authorName: {
        title: 'Author',
        type: 'string',
      },
      profile: {
        title: 'Profile',
        type: 'string',
      },
      state: {
        title: 'State',
        type: 'string',
      },
    },
  };

  constructor(private assessmentService: AssessmentService,
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
      switchMap(user => this.assessmentService.getUserAssessments(user.uid)),
      map(data => {
        if (data !== null)
          this.source.load(data);
      }),
    ).subscribe();
    this.assessmentService.releaseSection(this.user.uid).subscribe();
  }

  onEdit(data: any) {
    this.router.navigate(['/pages/assessment/my-plans/edit'], {state: data});
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
    } else if ($event.action === 'dashboard') {
      this.router.navigate(['/pages/assessment/my-plans/dashboard'], {state: $event.data});
    } else
      this.open(deleteQuestionDialog, $event);
  }

  onUserRowSelect(event): void {
    this.onEdit(event.data);
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
