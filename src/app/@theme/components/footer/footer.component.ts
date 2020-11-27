import {Component} from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Validity-Driven Application Usability Assessment Tool © 2020
    </span>
    <div class="socials">
      <a style="text-decoration:none" href="https://github.com/rodrigorjsf/tcc-usability-frontend" target="_blank"
         class="ion ion-social-github"><span> Github</span></a>
    </div>
  `,
})
export class FooterComponent {
}
