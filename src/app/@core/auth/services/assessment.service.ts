import {HttpClient, HttpHeaders} from "@angular/common/http";
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
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
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
}
