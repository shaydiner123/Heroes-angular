export interface Hero {
  id: number;
  name: string;
  abilityName: string;
  trainingStartDate: Date;
  suitColors: string[];
  startingPower: number;
  currentPower: number;
  TrainingAmountPerformedToday: number;
  trainerId: string;
}
