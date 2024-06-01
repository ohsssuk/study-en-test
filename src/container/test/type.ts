interface QuestionOptionType {
  optionId: number;
  optionContent: string;
  isAnswer: boolean;
}

interface QuestionType {
  questionId: number;
  questionTitle: string;
  questionContent: string;
  questionOption: QuestionOptionType[];
}

interface QuestionSetHelpType {
  content: string;
  words: string[];
}

interface QuestionSetType {
  questionSetId: number;
  questionSetTitle: string;
  questionSetContent: string;
  questionSetHelp: QuestionSetHelpType;
  question: QuestionType[];
}

interface TestFormType {
  testId: number;
  questionSet: QuestionSetType[];
}
