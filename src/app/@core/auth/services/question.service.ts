import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';

@Injectable()
export class QuestionService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  private get headers(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
    });
  }

  getQuestionsByCategory(category: string) {
    console.log(category);
    return this.http.get<any>(`${this.baseUrl}/question/by-category/` + category,
      {
        headers: this.headers,
        observe: 'body',
        responseType: 'json',
      });
  }

}
