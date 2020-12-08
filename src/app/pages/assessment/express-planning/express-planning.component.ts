import { Component, OnInit } from '@angular/core';
import {AssessmentService} from "../../../@core/auth/services/assessment.service";
import {Router} from "@angular/router";
import { Location } from '@angular/common'

@Component({
  selector: 'ngx-express-planning',
  templateUrl: './express-planning.component.html',
  styleUrls: ['./express-planning.component.scss']
})
export class ExpressPlanningComponent implements OnInit {

  constructor(private assessmentService: AssessmentService,
              private router: Router,
              private location: Location) { }

  ngOnInit(): void {
  }

  back() {
    this.location.back();
  }

  download() {
    this.assessmentService.downloadExpressPlan();
    this.router.navigate(['/pages/home']);
  }
}
