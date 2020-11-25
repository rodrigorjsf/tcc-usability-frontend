import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {CreateAssessmentDTO} from '../../../models/dto/CreateAssessmentDTO';
import {environment} from '../../../../environments/environment';
import {ApplicationSectionDTO} from "../../../models/dto/ApplicationSectionDTO";
import {UsabilityGoalDTO} from "../../../models/dto/UsabilityGoalDTO";
import {AssessmentVariablesDTO} from "../../../models/dto/AssessmentVariablesDTO";
import {ParticipantDTO} from "../../../models/dto/ParticipantDTO";
import {AssessmentToolsDTO} from "../../../models/dto/AssessmentToolsDTO";
import {AssessmentProcedureDTO} from "../../../models/dto/AssessmentProcedureDTO";
import {AssessmentDataDTO} from "../../../models/dto/AssessmentDataDTO";
import {AssessmentThreatDTO} from "../../../models/dto/AssessmentThreatDTO";

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

  async updateAssessmentApplicationSection(application: ApplicationSectionDTO) {
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

  async updateAssessmentParticipantSection(participant: ParticipantDTO) {
    return this.http.post<any>(`${this.baseUrl}/assessment/add/participant`, participant,
      {
        headers: this.headers,
        observe: 'body',
        responseType: 'json',
      });
  }

  async updateAssessmentToolsSection(tools: AssessmentToolsDTO) {
    return this.http.post<any>(`${this.baseUrl}/assessment/add/tools`, tools,
      {
        headers: this.headers,
        observe: 'body',
        responseType: 'json',
      });
  }

  async updateAssessmentProcedureSection(procedure: AssessmentProcedureDTO) {
    return this.http.post<any>(`${this.baseUrl}/assessment/add/procedure`, procedure,
      {
        headers: this.headers,
        observe: 'body',
        responseType: 'json',
      });
  }

  async updateAssessmentDataSection(dataDTO: AssessmentDataDTO) {
    return this.http.post<any>(`${this.baseUrl}/assessment/add/data`, dataDTO,
      {
        headers: this.headers,
        observe: 'body',
        responseType: 'json',
      });
  }

  async updateAssessmentThreatsSection(threats: AssessmentThreatDTO) {
    return this.http.post<any>(`${this.baseUrl}/assessment/add/threats`, threats,
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
