import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../../services/user/user.service';
import {catchError, map, tap} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {HttpErrorResponse} from '@angular/common/http';
import {of} from 'rxjs';

@Component({
  selector: 'ngx-register',
  styleUrls: ['./register.component.scss'],
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  form: FormGroup;
  constructor(private formBuilder: FormBuilder, private userService: UserService,
              private router: Router, private toastr: ToastrService) {
    this.form = formBuilder.group({
      name: [null, Validators.required],
      userName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, Validators.required],
      isReviewer: [false, Validators.required],
    });
  }

  register(): void {
    this.userService.registerUser(this.value).pipe(
      tap(() => this.router.navigate(['/'])),
      map(() => this.toastr.success('Cadastro realizado com sucesso')),
      catchError((err: HttpErrorResponse) => of(this.toastr.warning(err.error))),
    ).subscribe();
  }

  private get value() {
    return this.form.value;
  }

  get controls() {
    return this.form.controls;
  }

  get name() {
    return this.controls.name;
  }

  get userName() {
    return this.controls.userName;
  }

  get email() {
    return this.controls.email;
  }

  get password() {
    return this.controls.password;
  }

  get isReviewer() {
    return this.controls.isReviewer;
  }

  get confirmPassword() {
    return this.controls.confirmPassword;
  }

  get isValid() {
    return this.form.valid;
  }
}
