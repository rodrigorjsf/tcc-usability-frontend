// import {Injectable} from '@angular/core';
// import {ResponseMap} from './response.map';
// import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
// import {Blocker} from './blocker';
// import {NbToastrService} from '@nebular/theme';
// import {environment} from '../../../environments/environment';
//
//
// @Injectable()
// export class RestService {
//
//   private static readonly API = environment.posUrl;
//
//   constructor(private httpClient: HttpClient,
//               private blocker: Blocker,
//               private notifierToastr: NbToastrService) {
//   }
//
//   private get headers(): HttpHeaders {
//     return new HttpHeaders({
//       'Content-Type': 'application/json',
//     });
//   }
//
//   private static resolve(path: string): string {
//     return `${this.API}/api/${path}`;
//   }
//
//   public get<T>(url: string, queryString?: HttpParams): ResponseMap<T> {
//     return new ResponseMap<T>(this.blocker, this.notifierToastr, this.httpClient.get<T>(RestService.resolve(url), {
//       headers: this.headers,
//       observe: 'body',
//       params: queryString,
//       responseType: 'json',
//     }));
//   }
//
//   public getResponse<T>(url: string, queryString?: HttpParams): ResponseMap<HttpResponse<T>> {
//     return new ResponseMap<HttpResponse<T>>(this.blocker, this.notifierToastr,
//       this.httpClient.get<T>(RestService.resolve(url), {
//       headers: this.headers,
//       observe: 'response',
//       params: queryString,
//       responseType: 'json',
//     }));
//   }
//
//   public delete<T>(url: string, queryString?: HttpParams): ResponseMap<T> {
//     return new ResponseMap<T>(this.blocker, this.notifierToastr, this.httpClient.delete<T>
//     (RestService.resolve(url), {
//       headers: this.headers,
//       observe: 'body',
//       params: queryString,
//       responseType: 'json',
//     }));
//   }
//
//   public post<T>(url: string, data: any, queryString?: HttpParams): ResponseMap<T> {
//     return new ResponseMap<T>(this.blocker, this.notifierToastr,
//       this.httpClient.post<T>(RestService.resolve(url), data, {
//       headers: this.headers,
//       observe: 'body',
//       params: queryString,
//       responseType: 'json',
//     }));
//   }
//
//   public postResponse<T>(url: string, data: any, queryString?: HttpParams): ResponseMap<HttpResponse<T>> {
//     return new ResponseMap<HttpResponse<T>>(this.blocker, this.notifierToastr,
//       this.httpClient.post<T>(RestService.resolve(url), data, {
//       headers: this.headers,
//       observe: 'response',
//       params: queryString,
//       responseType: 'json',
//     }));
//   }
//
//   public put<T>(url: string, data: any, queryString?: HttpParams): ResponseMap<T> {
//     return new ResponseMap<T>(this.blocker, this.notifierToastr,
//       this.httpClient.put<T>(RestService.resolve(url), data, {
//       headers: this.headers,
//       observe: 'body',
//       params: queryString,
//       responseType: 'json',
//     }));
//   }
// }
