"use client";

import styles from "./Test.module.css";

import CommonBtn from "@/components/commonBtn";

interface InTestProps {
  testForm: TestFormType;
}

export default function InTest({ testForm }: InTestProps) {
  const questionSet = testForm.questionSet[0];
  console.log(questionSet);

  return (
    <>
      <article id={styles.in_test}>
        <section className={styles.head}>
          <div className={styles.timer}>
            <p>소요 시간</p>
            <p>00 : 00</p>
          </div>
          <div className={styles.progress}>
            <p>진행</p>
            <p>1/3</p>
          </div>
        </section>

        <section className={styles["question-set"]}>
          <div className={styles.content}>
            <h3>{questionSet.questionSetTitle}</h3>
            <p>{questionSet.questionSetContent}</p>
          </div>

          <ul className={styles["question-list"]}>
            {questionSet.question.map((question) => (
              <li key={question.questionId}>
                <p className={styles["question-title"]}>
                  {question.questionTitle}
                </p>
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
                        {option.optionContent}
                      </label>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </>
  );
}
