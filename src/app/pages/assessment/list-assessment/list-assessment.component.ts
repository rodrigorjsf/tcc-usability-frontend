import {Component, TemplateRef} from '@angular/core';
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
export class ListAssessmentComponent {

  data: any;
  source: LocalDataSource = new LocalDataSource();
  show: boolean = true;
  toast: ToastService;

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
    this.store.select(selectUser).pipe(
      switchMap(user => this.assessmentService.getUserAssessments(user.uid)),
      map(data => {
        if (data !== null)
          this.source.load(data);
      }),
    ).subscribe();
    this.show = false;
  }

  onEdit($event: any) {
    console.log($event.data);
    this.router.navigate(['/pages/assessment/my-assessments/edit'], {state: $event.data});
  }

  async onDelete($event: any) {
    console.log($event.data);
    (await this.assessmentService.deleteAssessment($event.data.uid))
      .subscribe(response => {
          if (response.status === 200) {
            this.toast.showToast('delete', 'top-right', 'success', 'Assessment');
          } else {
            this.toast.showToast('delete', 'top-right', 'danger', 'Assessment');
          }
          this.router.navigate(['/pages/assessment/my-assessments']);
        },
        () => {
          this.toast.showToast('delete', 'top-right', 'danger', 'Assessment');
        });
  }

  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, {context: 'this is some additional data passed to dialog'});
  }
}
