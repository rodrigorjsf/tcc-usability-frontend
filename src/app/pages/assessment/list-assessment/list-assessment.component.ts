import {Component, OnInit, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {LocalDataSource} from 'ng2-smart-table';
import {AssessmentService} from '../../../@core/auth/services/assessment.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store';
import {selectUser} from '../../../store/modules/user/user.selectors';
import {map, switchMap} from 'rxjs/operators';
import {NbDialogService, NbToastrService} from "@nebular/theme";
import {ToastService} from "../../../services/toastService";

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

  settings = {
    mode: 'external',
    actions: {
      add: false,
      position: 'right',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
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
  }

  onEdit($event: any) {
    this.router.navigate(['/pages/assessment/my-assessments/edit'], {state: $event.data});
  }

  async onDelete($event: any) {
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
}
