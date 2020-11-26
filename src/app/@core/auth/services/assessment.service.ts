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
import * as FileSaver from "file-saver";
import {NbToastrService} from "@nebular/theme";
import {ToastService} from "../../../services/toastService";
import {SendMailRequest} from "../../../models/dto/SendMailRequest";
import {SectionControlRequestDTO} from "../../../models/dto/SectionControlRequestDTO";
import {SectionUpdateRequestDTO} from "../../../models/dto/SectionUpdateRequestDTO";
import {Observable} from "rxjs";

@Injectable()
export class AssessmentService {

  private baseUrl = environment.baseUrl;
  toast: ToastService;

  constructor(private http: HttpClient,
              private toastrService: NbToastrService) {
    this.toast = new ToastService(toastrService);
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

  async updatePlanState(uid: string) {
    return this.http.put<any>(`${this.baseUrl}/assessment/finish/` + uid,
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

  getAssessmentByUid(userUid: string): Observable<any> {
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

  releaseSection(uid: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/assessment/release/section/` + uid,
      {
        headers: this.headers,
        observe: 'response',
        responseType: 'json',
      });
  }

  verifySection(sectionRequest: SectionUpdateRequestDTO) {
    return this.http.post<any>(`${this.baseUrl}/assessment/verify/section`, sectionRequest,
      {
        headers: this.headers,
        observe: 'body',
        responseType: 'json',
      });
  }


  async updateSection(sectionUpdate: SectionUpdateRequestDTO) {
    this.http.post<any>(`${this.baseUrl}/assessment/update/section`, sectionUpdate,
      {
        headers: this.headers,
        observe: 'response',
        responseType: 'json',
      });
  }

  downloadPlan(planUid: string, fileName: string) {
    const request = this.http.get(`${this.baseUrl}/assessment/` + planUid + `/file`,
      {
        headers: this.headers,
        observe: 'body',
        responseType: 'arraybuffer',
      });
    request.subscribe(
      data => {
        const blob: any = new Blob([data], {type: 'application/octet-stream'});

        FileSaver.saveAs(blob, fileName.replace(/\s/g, '') + '.pdf');
      },
      (err) => {
        console.log(err);
        const statusInfo = err.statusText ? `${err.statusText}.` : '';
        this.toast.showToast('download', 'top-right', 'danger', 'assessment');
      });
  }

  sendPlanToEmail(emails: SendMailRequest) {
    const request = this.http.post<any>(`${this.baseUrl}/assessment/export/to-email`, emails,
      {
        headers: this.headers,
        observe: 'body',
        responseType: 'json',
      });
    request.subscribe(
      () => {
        this.toast.showToast('send', 'top-right', 'success', 'email');
      },
      () => {
        this.toast.showToast('send', 'top-right', 'danger', 'email');
      });
  }
}
