// import {Observable, ReplaySubject} from "rxjs";
// import "rxjs-compat/add/observable/of";
//
// export class Fingerprint {
//   private static subject: ReplaySubject<string> = null;
//
//   constructor() {
//     if (Fingerprint.subject == null) {
//       Fingerprint.subject = new ReplaySubject<string>(1);
//       window['io_install_flash'] = false;
//       window['io_install_stm'] = false;
//       let finish = false;
//       window['io_bb_callback'] = (bb: string, complete: boolean) => {
//         if (complete && !finish) {
//           Fingerprint.subject.next(bb);
//           Fingerprint.subject.complete();
//           finish = true
//         }
//       };
//     }
//   }
//
//   public get value(): Observable<string> {
//     return Fingerprint.subject;
//   }
// }
