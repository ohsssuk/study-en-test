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
                  name={`question-check-${question.questionId}`}
                  className={`sr-only ${styles["question-option-radio"]}`}
                  onChange={() =>
                    handleChangeAnswer(question.questionId, option.optionId)
                  }
                />
                <label
                  htmlFor={`question_option_${option.optionId}`}
                  className={styles["question-option-label"]}
                >
                  <span
                    style={
                      isCompleted &&
                      !question.isCorrect &&
                      option.optionId === question.questionCorrectOptionId
                        ? {
                            backgroundColor: "#415ef3",
                            color: "#fff",
                            border: "1px solid transparent",
                          }
                        : {}
                    }
                  >
                    {["A", "B", "C", "D"][index] ?? "?"}
                  </span>
                  <p>{option.optionContent}</p>
                </label>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
