import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {AssessmentData} from './assessment.data';
import {CreateAssessmentRequestModel} from '../../models/assessment.model';
import {Observable} from 'rxjs';

@Injectable()
export class AssessmentService implements AssessmentData {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  create(data: CreateAssessmentRequestModel): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/assessment/create`, data);
  }
}
