import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Assessment} from '../../../models/assessment';
import {CreateAssessmentDTO} from '../../../models/dto/CreateAssessmentDTO';
import {AssessmentService} from '../../../@core/auth/services/assessment.service';

@Component({
  selector: 'ngx-create-assessment',
  styleUrls: ['./create-assessment.component.scss'],
  templateUrl: './create-assessment.component.html',
})
export class CreateAssessmentComponent implements OnInit {

  assessment: Assessment;
  newAssessment: CreateAssessmentDTO;
  email: string;
  isVald = false;
  hasCollaborator: boolean = false;
  emails: any[] = [{
    id: 1,
    newEmail: '',
  }];

  constructor (private assessmentService: AssessmentService) {
  }

  ngOnInit() {
    this.newAssessment = new CreateAssessmentDTO();
    this.assessment = new Assessment();
  }

  addEmail() {
    if (!this.hasCollaborator) {
      this.hasCollaborator = !this.hasCollaborator;
    } else {
      this.emails.push({
        id: this.emails.length + 1,
        newEmail: '',
      });
    }
  }

  removeEmail(i: number) {
    this.emails.splice(i, 1);
    if (!this.emails.length) {
      this.hasCollaborator = !this.hasCollaborator;
    }
  }

  addCollaboratorFlag() {
    this.hasCollaborator = !this.hasCollaborator;
  }

  verifyAssessment(): boolean {
    if (this.newAssessment.projectName && this.newAssessment.projectDescription) {
      return true;
    }
    return false;
  }

  async create() {
    console.log(this.newAssessment);
    console.log(this.verifyAssessment());
    this.newAssessment.collaboratorsEmail = [];
    const user = JSON.parse(localStorage.getItem('user'));
    this.newAssessment.userUid = user.userUid;

    this.emails.forEach(value => {
      if (value.newEmail !== "")
        this.newAssessment.collaboratorsEmail.push(value.newEmail);
    });
    console.log(this.newAssessment);
    (await this.assessmentService.createNewAssessment(this.newAssessment))
      .subscribe(data => {
        this.assessment = data;
        console.log(this.assessment);
      });
  }
}
