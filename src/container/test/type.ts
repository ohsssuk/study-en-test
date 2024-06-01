interface QuestionOptionType {
  optionId: number;
  optionContent: string;
}

interface QuestionType {
  questionId: number;
  questionTitle: string;
  questionContent: string;
  questionCorrectOptionId: number;
  questionUserSelectedOptionId: number;
  isCorrect: boolean;
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
  isCompleted: boolean;
  score: number;
}

interface TestFormType {
  testId: number;
  questionSet: QuestionSetType[];
}

interface SetAnswerType {
  questionId: number;
  optionId: number;
}
interface TestAnswerType {
  questionSetId: number;
  answers: SetAnswerType[];
}
