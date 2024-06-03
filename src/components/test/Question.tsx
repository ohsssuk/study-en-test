import styles from "@/container/test/Test.module.css";
import OptionList from "./OptionList";

interface QuestionProps {
  question: QuestionType;
  isCompleted: boolean;
  onChange: (questionId: number, optionId: number) => void;
}

export default function Question({
  question,
  isCompleted,
  onChange,
}: QuestionProps) {
  const handleChangeAnswer = (questionId: number, optionId: number) => {
    onChange(questionId, optionId);
  };

  return (
    <li>
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

      <OptionList
        options={question.questionOption}
        question={question}
        isCompleted={isCompleted}
        onChange={handleChangeAnswer}
      />

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
  );
}
