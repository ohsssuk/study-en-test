import styles from "@/container/test/Test.module.css";

interface QuestionListProps {
  questionList: QuestionType[];
}
export default function QuestionList({ questionList }: QuestionListProps) {
  return (
    <ul className={styles["question-list"]}>
      {questionList.map((question) => (
        <li key={question.questionId}>
          <p className={styles["question-title"]}>{question.questionTitle}</p>
          <p className={styles["question-content"]}>
            {question.questionContent}
          </p>

          <ul className={styles["question-option"]}>
            {question.questionOption.map((option) => (
              <li key={option.optionId}>
                <input
                  type="radio"
                  id={`question_option_${option.optionId}`}
                  name={`question-check-${question.questionId}`}
                  className={`sr-only ${styles["question-option-radio"]}`}
                />
                <label
                  htmlFor={`question_option_${option.optionId}`}
                  className={styles["question-option-label"]}
                >
                  <span>A</span>
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
