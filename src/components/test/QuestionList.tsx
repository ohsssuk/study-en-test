import styles from "@/container/test/Test.module.css";
import { findItemFromListById } from "@/lib/common";

interface QuestionListProps {
  questionList: QuestionType[];
  isCompleted?: boolean;
  onChange: (questionId: number, optionId: number) => void;
}
export default function QuestionList({
  questionList,
  isCompleted = false,
  onChange,
}: QuestionListProps) {
  const handleChangeAnswer = (questionId: number, optionId: number) => {
    onChange(questionId, optionId);
  };

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

  return (
    <ul className={styles["question-list"]}>
      {questionList.map((question) => (
        <li key={question.questionId}>
          <p className={styles["question-title"]}>{question.questionTitle}</p>
          <div className={styles["question-content"]}>
            <p>{question.questionContent}</p>
            {isCompleted && (
              <span
                className={styles["correct-check"]}
                style={{
                  backgroundColor: question.isCorrect ? "#415ef3" : "#db3232",
                }}
              >
                {question.isCorrect ? "정답" : "오답"}
              </span>
            )}
          </div>

          <ul className={styles["question-option"]}>
            {question.questionOption.map((option, index) => (
              <li key={option.optionId}>
                <input
                  type="radio"
                  id={`question_option_${option.optionId}`}
                  name={`question_check_${question.questionId}`}
                  className={`sr-only`}
                  disabled={isCompleted ? true : false}
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

          {isCompleted && (
            <div className={styles.help}>
              <p
                dangerouslySetInnerHTML={{
                  __html: question.questionHelp.content,
                }}
              />
              {question.questionHelp.words && (
                <ul className={styles.words}>
                  {question.questionHelp.words.map((word, index) => (
                    <li key={index}>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: word,
                        }}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
