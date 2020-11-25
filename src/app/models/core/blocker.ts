import {Subject} from 'rxjs';

export class Blocker {
  public subject: Subject<boolean>;

  constructor() {
    this.subject = new Subject<boolean>();
  }
}
