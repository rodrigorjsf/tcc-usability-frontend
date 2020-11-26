export class SectionControlResponseDTO {
  sectionControlEnum: string;
  userName: string;

  constructor(sectionControlEnum: string, userName: string) {
    this.sectionControlEnum = sectionControlEnum;
    this.userName = userName;
  }
}
