import styles from "@/container/test/Test.module.css";

interface OptionListProps {
  options: QuestionOptionType[];
  question: QuestionType;
  isCompleted: boolean;
  onChange: (questionId: number, optionId: number) => void;
}

export default function OptionList({
  options,
  question,
  isCompleted,
  onChange,
}: OptionListProps) {
  const getAnswerHeadGradeStyle = ({
    question,
    option,
  }: {
    question: QuestionType;
    option: QuestionOptionType;
  }) => {
    return isCompleted
      ? option.optionId === question.questionCorrectOptionId
        ? {
            backgroundColor: "#415ef3",
            color: "#fff",
            border: "1px solid transparent",
          }
        : option.optionId === question.questionUserSelectedOptionId
        ? {
            backgroundColor: "#f00",
            color: "#fff",
            border: "1px solid transparent",
          }
        : {}
      : {};
  };

  const handleChangeAnswer = (questionId: number, optionId: number) => {
    onChange(questionId, optionId);
  };

  return (
    <ul className={styles["question-option"]}>
      {options.map((option, index) => (
        <li key={option.optionId}>
          <input
            type="radio"
            id={`question_option_${option.optionId}`}
            name={`question_check_${question.questionId}`}
            className={`sr-only`}
            disabled={isCompleted}
            onChange={() =>
              handleChangeAnswer(question.questionId, option.optionId)
            }
          />
          <label
            htmlFor={`question_option_${option.optionId}`}
            className={styles["question-option-label"]}
          >
            <span style={getAnswerHeadGradeStyle({ question, option })}>
              {["A", "B", "C", "D"][index] ?? "?"}
            </span>
            <p>{option.optionContent}</p>
          </label>
        </li>
      ))}
    </ul>
  );
}
