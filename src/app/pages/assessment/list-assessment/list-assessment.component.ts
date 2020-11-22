import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LocalDataSource} from 'ng2-smart-table';
import {AssessmentService} from '../../../@core/auth/services/assessment.service';
import {selectSigned} from "../../../store/modules/auth/auth.selectors";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store";
import {selectUser} from "../../../store/modules/user/user.selectors";

@Component({
  selector: 'ngx-list-assessment',
  styleUrls: ['./list-assessment.component.scss'],
  templateUrl: './list-assessment.component.html',
})
export class ListAssessmentComponent implements OnInit {

  data: any;
  source: LocalDataSource = new LocalDataSource();
  show: boolean = true;
  router: Router;
  user: any;

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

  ngOnInit(): void {
  }

  constructor(private assessmentService: AssessmentService,
              router: Router, private store: Store<AppState>) {
    this.router = router;
    this.store.select(selectUser).subscribe(signed => this.user = signed);
    console.log(this.user);
    this.assessmentService.getUserAssessments(this.user.uid)
      .subscribe(data => {
        console.log(data);
        this.source.load(data);
      });
    this.show = false;
  }

  onEdit($event: any) {
    console.log($event.data);
    this.router.navigate(['/pages/assessment/my-assessments/edit'], {state: $event.data});
  }
}
