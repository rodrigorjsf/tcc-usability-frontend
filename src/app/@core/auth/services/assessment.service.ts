import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {CreateAssessmentDTO} from '../../../models/dto/CreateAssessmentDTO';
import {environment} from '../../../../environments/environment';

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
}
