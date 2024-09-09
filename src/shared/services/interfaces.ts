export interface ResponseJsonApi<T> {
  status: "success" | "error";
  statusCode: number;
  message?: string;
  data?: T;
}

// Question and Options
export type TQuestionsWithLast = {
  questions: TQuestionWithOptions[] | null;
  last: TQuestionWithOptions | null;
};

export type TQuestion = {
  id: string;
  title: string;
  createdAt: string;
  deletedAt: string | null;
  isActive: boolean;
  chosenOptionId?: string
};

export type TOption = {
  id: string;
  name: string;
  questionId: string;
};

export type TOptionWithVotes = TOption & {
  _count: {
    vote: number;
  };
};

export type TQuestionWithOptions = TQuestion & {
  options: TOptionWithVotes[];
};

// Voter
export type TVoter = {
  id: string;
  code: string;
  country: string;
  state: string;
  createdAt: string;
  isActive: boolean;
};

// Vote Payload
export type TVoteCreatePayload = {
  voterCode?: string;
  questionId?: string;
  optionId?: string;
};

export type TVote = {
  id: string;
  optionId: string;
  deletedDescription: string | null;
  voterId: string;
  isActive: boolean;
  createdAt: Date;
  deletedAt: Date | null;
};
