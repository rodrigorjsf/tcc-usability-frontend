// import {Observable} from 'rxjs';
// import {Blocker} from './blocker';
// import {throwError} from 'rxjs/internal/observable/throwError';
// import {HttpErrorResponse} from '@angular/common/http';
// import {ToastrService} from 'ngx-toastr';
// import {map, catchError} from 'rxjs/operators';
//
// export class ResponseMap<T> {
//
//   private static _timeout = 100000;
//   private privateIsHideTitleSuccess: boolean;
//   private privateIsHideTitleError: boolean;
//
//   constructor(private privateBlocker: Blocker, private toastrService:
//   ToastrService, private privateObservable: Observable<T>) {
//     this.privateIsHideTitleSuccess = false;
//     this.privateIsHideTitleError = false;
//   }
//
//   public noBlocker(): this {
//     this.privateBlocker = null;
//     return this;
//   }
//
//   public blocker(blocker: Blocker): this {
//     this.privateBlocker = blocker;
//     return this;
//   }
//
//   public hideTitleSuccess(): this {
//     this.privateIsHideTitleSuccess = true;
//     return this;
//   }
//
//   public hideTitleError(): this {
//     this.privateIsHideTitleError = true;
//     return this;
//   }
//
//   public observable(): Observable<T> {
//     if (this.privateBlocker) {
//       this.privateBlocker.subject.next(true);
//     }
//
//     return this.privateObservable.pipe(
//       map((data: T): T => {
//
//         if (!this.privateIsHideTitleSuccess) {
//           this.toastrService.success(null, 'Requisição processada com sucesso.');
//         }
//
//         if (this.privateBlocker) {
//           this.privateBlocker.subject.next(false);
//         }
//
//         return data;
//       }),
//       catchError((httpErrorResponse: HttpErrorResponse): Observable<any> => {
//
//         if (!this.privateIsHideTitleError) {
//           if (httpErrorResponse.error !== undefined) {
//             this.toastrService.error('Erro ao processar a requisição. ');
//           }
//         }
//
//         if (this.privateBlocker) {
//           this.privateBlocker.subject.next(false);
//         }
//         return throwError(httpErrorResponse);
//       }));
//   }
// }
