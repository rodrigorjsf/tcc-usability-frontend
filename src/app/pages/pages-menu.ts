import {NbMenuItem} from '@nebular/theme';

export const USER_MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Home',
    icon: 'home-outline',
    link: '/pages/home',
    home: true,
  },
  {
    title: 'Assessment',
    icon: 'file-text-outline',
    expanded: true,
    children: [
      {
        title: 'Create Plan',
        icon: 'file-add-outline',
        link: '/pages/assessment/create',
      },
      {
        title: 'My Assessment Plans',
        icon: 'list-outline',
        link: '/pages/assessment/my-plans',
      },
      {
        title: 'In Review Phase',
        icon: 'book-open-outline',
        link: '/pages/assessment/list',
      },
      {
        title: 'Archived Assessment Plans',
        icon: 'done-all-outline',
        link: '/pages/assessment/list',
      },
      {
        title: 'Enter as Collaborator',
        icon: 'person-add-outline',
        link: '/pages/assessment/list',
      },
    ],
  },
  {
    title: 'ABOUT',
    group: true,
  },
  {
    title: 'Evaluation criteria',
    icon: 'checkmark-square-outline',
    link: '/pages/layout/stepper',
  },
  {
    title: 'The evaluation',
    icon: 'question-mark-circle-outline',
    link: '/pages/layout/list',
  },
  {
    title: 'References',
    icon: 'bookmark-outline',
    link: '/pages/layout/stepper',
  },
  {
    title: 'Suggested Scales',
    icon: 'bar-chart-outline',
    link: '/pages/layout/stepper',
  },
];

export const REVIEWER_MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Home',
    icon: 'home-outline',
    link: '/pages/home',
    home: true,
  },
  {
    title: 'Review Requests',
    icon: 'eye-outline',
    link: '/pages/layout/stepper',
  },
  {
    title: 'Assessment',
    icon: 'file-text-outline',
    children: [
      {
        title: 'Create Plan',
        icon: 'file-add-outline',
        link: '/pages/assessment/create',
      },
      {
        title: 'My Assessment Plans',
        icon: 'list-outline',
        link: '/pages/assessment/my-plans',
      },
      {
        title: 'In Review Phase',
        icon: 'book-open-outline',
        link: '/pages/assessment/list',
      },
      {
        title: 'Archived Assessment Plans',
        icon: 'done-all-outline',
        link: '/pages/assessment/list',
      },
      {
        title: 'Enter as Collaborator',
        icon: 'person-add-outline',
        link: '/pages/assessment/list',
      },
    ],
  },
  {
    title: 'ABOUT',
    group: true,
  },
  {
    title: 'Evaluation criteria',
    icon: 'checkmark-square-outline',
    link: '/pages/layout/stepper',
  },
  {
    title: 'The evaluation',
    icon: 'question-mark-circle-outline',
    link: '/pages/layout/list',
  },
  {
    title: 'References',
    icon: 'bookmark-outline',
    link: '/pages/layout/stepper',
  },
  {
    title: 'Suggested Scales',
    icon: 'bar-chart-outline',
    link: '/pages/layout/stepper',
  },
];
