import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LocalDataSource} from 'ng2-smart-table';
import {AssessmentService} from '../../../@core/auth/services/assessment.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store';
import {selectUser} from '../../../store/modules/user/user.selectors';
import {map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'ngx-list-assessment',
  styleUrls: ['./list-assessment.component.scss'],
  templateUrl: './list-assessment.component.html',
})
export class ListAssessmentComponent {

  data: any;
  source: LocalDataSource = new LocalDataSource();
  show: boolean = true;

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

  constructor(private assessmentService: AssessmentService, private store: Store<AppState>) {
    this.store.select(selectUser).pipe(
      switchMap(user => this.assessmentService.getAssessmentByUid(user.uid)),
      map(data => this.source.load(data)),
    ).subscribe();
    this.show = false;
  }

  onEdit($event: any) {
    console.log($event.data);
  }
}
