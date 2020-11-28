import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {NbToastrService} from "@nebular/theme";
import {ToastService} from "../../../services/toastService";
import {ReviewRequestDTO} from "../../../models/dto/ReviewRequestDTO";
import {BeginReviewDTO} from "../../../models/dto/BeginReviewDTO";
import {FinishReviewDTO} from "../../../models/dto/FinishReviewDTO";
import * as FileSaver from "file-saver";

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

  async finishReview(finishReview: FinishReviewDTO) {
    return this.http.post<any>(`${this.baseUrl}/review/finish`, finishReview,
      {
        headers: this.headers,
        observe: 'body',
        responseType: 'json',
      });
  }

  getReviewedPlanList(uid: string) {
    return this.http.get<any>(`${this.baseUrl}/review/completed/list/` + uid,
      {
        headers: this.headers,
        observe: 'body',
        responseType: 'json',
      });
  }

  async deleteReview(reviewUid: any) {
    return this.http.put<any>(`${this.baseUrl}/review/detete/` + reviewUid,
      {
        headers: this.headers,
        observe: 'body',
        responseType: 'json',
      });
  }

  downloadPlanReview(reviewUid: string, fileName: string) {
    const request = this.http.get(`${this.baseUrl}/review/` + reviewUid + `/file`,
      {
        headers: this.headers,
        observe: 'body',
        responseType: 'arraybuffer',
      });
    request.subscribe(
      data => {
        const blob: any = new Blob([data], {type: 'application/octet-stream'});

        FileSaver.saveAs(blob, fileName.replace(/\s/g, '') + '-plan-review.pdf');
      },
      (err) => {
        this.toast.showToastr('top-right', 'danger', 'Error downloading review');
      });
  }

  findReviewByUid(reviewUid: any) {
    return this.http.get<any>(`${this.baseUrl}/review/by-uid/` + reviewUid,
      {
        headers: this.headers,
        observe: 'body',
        responseType: 'json',
      });
  }
}
