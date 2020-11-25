import {PlanParticipantsAnswers} from "../assessment-answers";

export class ParticipantDTO {
  assessmentUid: string;
  participantsQuantity: number;
  participationLocalType: string;
  compensationDescription: string;
  criteria: string;
  hasCollectedInformation: boolean;
  collectedInformationUse: string;
  instructions: string;
  questions: string[];
  planParticipantsAnswers: PlanParticipantsAnswers;

  constructor(uid: string,
              participantsQuantity: number,
              participationLocalType: string,
              compensationDescription: string,
              criteria: string,
              hasCollectedInformation: boolean,
              collectedInformationUse: string,
              instructions: string,
              questions: string[],
              planParticipantsAnswers: PlanParticipantsAnswers) {
    this.assessmentUid = uid;
    this.participantsQuantity = participantsQuantity;
    this.participationLocalType = participationLocalType;
    this.compensationDescription = compensationDescription;
    this.criteria = criteria;
    this.hasCollectedInformation = hasCollectedInformation;
    this.collectedInformationUse = collectedInformationUse;
    this.instructions = instructions;
    this.questions = questions;
    this.planParticipantsAnswers = planParticipantsAnswers;
  }
}
