import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {NbThemeService} from '@nebular/theme';
import {switchMap, takeWhile} from 'rxjs/operators';
import {SolarData} from '../../@core/data/solar';
import {Router} from '@angular/router';
import {AssessmentService} from "../../@core/auth/services/assessment.service";
import {selectUser} from "../../store/modules/user/user.selectors";
import {Store} from "@ngrx/store";
import {AppState} from "../../store";

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-home',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnDestroy {

  solarValue: number;
  lightCard: CardSettings = {
    title: 'Light',
    iconClass: 'nb-lightbulb',
    type: 'primary',
  };
  rollerShadesCard: CardSettings = {
    title: 'Roller Shades',
    iconClass: 'nb-roller-shades',
    type: 'success',
  };
  wirelessAudioCard: CardSettings = {
    title: 'Wireless Audio',
    iconClass: 'nb-audio',
    type: 'info',
  };
  coffeeMakerCard: CardSettings = {
    title: 'Coffee Maker',
    iconClass: 'nb-coffee-maker',
    type: 'warning',
  };
  statusCards: string;
  commonStatusCardsSet: CardSettings[] = [
    this.lightCard,
    this.rollerShadesCard,
    this.wirelessAudioCard,
    this.coffeeMakerCard,
  ];
  statusCardsByThemes: {
    default: CardSettings[];
    cosmic: CardSettings[];
    corporate: CardSettings[];
    dark: CardSettings[];
  } = {
    default: this.commonStatusCardsSet,
    cosmic: this.commonStatusCardsSet,
    corporate: [
      {
        ...this.lightCard,
        type: 'warning',
      },
      {
        ...this.rollerShadesCard,
        type: 'primary',
      },
      {
        ...this.wirelessAudioCard,
        type: 'danger',
      },
      {
        ...this.coffeeMakerCard,
        type: 'info',
      },
    ],
    dark: this.commonStatusCardsSet,
  };
  private alive = true;
  isReviewer: any;

  constructor(private themeService: NbThemeService,
              private assessmentService: AssessmentService,
              private solarService: SolarData,
              private store: Store<AppState>,
              private router: Router) {
    this.store.select(selectUser).subscribe(user => this.isReviewer = user.reviewer);
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
        this.store.select(selectUser).pipe(
          switchMap(user => this.assessmentService.releaseSection(user.uid))).subscribe();
      });
    this.solarService.getSolarData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((data) => {
        this.solarValue = data;
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }

  goToCreate() {
    this.router.navigate(['/pages/assessment/create']);
  }

  goToPlans() {
    this.router.navigate(['/pages/assessment/my-plans']);
  }

  goToReviewPlan() {
    this.router.navigate(['/pages/assessment/reviewed-plan']);
  }
}
