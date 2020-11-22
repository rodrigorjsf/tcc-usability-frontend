import {CreateAssessmentRequestModel} from '../../models/assessment.model';
import {Observable} from 'rxjs';

export abstract class AssessmentData {
  abstract create(data: CreateAssessmentRequestModel): Observable<void>;
}
