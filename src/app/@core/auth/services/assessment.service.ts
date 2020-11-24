import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {CreateAssessmentDTO} from '../../../models/dto/CreateAssessmentDTO';
import {environment} from '../../../../environments/environment';
import {SmartCityQuestionnaireDTO} from "../../../models/dto/SmartCityQuestionnaireDTO";
import {UsabilityGoalDTO} from "../../../models/dto/UsabilityGoalDTO";
import {AssessmentVariablesDTO} from "../../../models/dto/AssessmentVariablesDTO";

@Injectable()
export class AssessmentService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  private get headers(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  async createNewAssessment(newAssessment: CreateAssessmentDTO) {
    return this.http.post<any>(`${this.baseUrl}/assessment/create`, newAssessment,
      {
      headers: this.headers,
      observe: 'body',
      responseType: 'json',
    });
  }

  async updateAssessmentApplicationSection(application: SmartCityQuestionnaireDTO) {
    return this.http.post<any>(`${this.baseUrl}/assessment/add/smartcity-questionnaire`, application,
      {
        headers: this.headers,
        observe: 'body',
        responseType: 'json',
      });
  }

  async updateAssessmentGoalsSection(goals: UsabilityGoalDTO) {
    return this.http.post<any>(`${this.baseUrl}/assessment/add/goals`, goals,
      {
        headers: this.headers,
        observe: 'body',
        responseType: 'json',
      });
  }

  async updateAssessmentVariableSection(variables: AssessmentVariablesDTO) {
    return this.http.post<any>(`${this.baseUrl}/assessment/add/variables`, variables,
      {
        headers: this.headers,
        observe: 'body',
        responseType: 'json',
      });
  }

  async deleteAssessment(uid: string) {
    return this.http.put<any>(`${this.baseUrl}/assessment/delete/` + uid,
      {
        headers: this.headers,
        observe: 'response',
        responseType: 'json',
      });
  }

  getUserAssessments(userUid: string) {
    return this.http.get<any>(`${this.baseUrl}/assessment/list/by-user-uid/` + userUid,
      {
        headers: this.headers,
        observe: 'body',
        responseType: 'json',
      });
  }

  getAssessmentByUid(userUid: string) {
    return this.http.get<any>(`${this.baseUrl}/assessment/by-uid/` + userUid,
      {
        headers: this.headers,
        observe: 'body',
        responseType: 'json',
      });
  }

  getScaleList() {
    return this.http.get<any>(`${this.baseUrl}/assessment/scales`,
      {
        headers: this.headers,
        observe: 'body',
        responseType: 'json',
      });
  }
}
