import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {NbToastrService} from "@nebular/theme";
import {ToastService} from "../../../services/toastService";
import {ReviewRequestDTO} from "../../../models/dto/ReviewRequestDTO";
import {BeginReviewDTO} from "../../../models/dto/BeginReviewDTO";

@Injectable()
export class ReviewService {

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

  submitReview(reviewRequest: ReviewRequestDTO) {
    return this.http.post<any>(`${this.baseUrl}/review/submit`, reviewRequest,
      {
        headers: this.headers,
        observe: 'body',
        responseType: 'json',
      });
  }

  getAvailableReviews(uid: string) {
    return this.http.get<any>(`${this.baseUrl}/review/list/` + uid,
      {
        headers: this.headers,
        observe: 'body',
        responseType: 'json',
      });
  }

  getAssessmentByReviewUid(beginReviewDTO: BeginReviewDTO) {
    return this.http.post<any>(`${this.baseUrl}/review/find`, beginReviewDTO,
      {
        headers: this.headers,
        observe: 'body',
        responseType: 'json',
      });
  }

  startReview(beginReviewDTO: BeginReviewDTO) {
    return this.http.post<any>(`${this.baseUrl}/review/start`, beginReviewDTO,
      {
        headers: this.headers,
        observe: 'body',
        responseType: 'json',
      });
  }
}
