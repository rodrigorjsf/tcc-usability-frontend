export class PlanForm {
  section: string;
  key: string;
  parentQuestions: ParentQuestion[];
}

export class ParentQuestion {
  title: string;
  questions: Question[];
  instruction: string;
  hint: string;
  placeHolder: string;
  scales: Scale[];
}

export class Question {
  objectKey: string;
  title: string;
  subTitle: string;
  placeHolder: string;
  hint: string;
}

export class Scale {
  acronym: string;
  name: string;
  description: string;
  measures: string[];
  scaleQuestions: ScaleQuestion[];
}

export class ScaleQuestion {
  key: string;
  question: string;
  lowerScoreLabel: string;
  higherScoreLabel: string;
}
