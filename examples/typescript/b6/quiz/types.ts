export interface ChoiceQuestion {
  kind: "choice";
  prompt: string;
  choices: string[];
  answer: number;
}

export interface TextQuestion {
  kind: "text";
  prompt: string;
  answer: string;
}

export type Question = ChoiceQuestion | TextQuestion;
