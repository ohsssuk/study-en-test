"use client";

import TestHead from "@/components/test/TestHead";
import styles from "./Test.module.css";

import CommonBtn from "@/components/commonBtn";
import QuestionList from "@/components/test/QuestionList";
import QuestionSetContent from "@/components/test/QuestionSetContent";

interface InTestProps {
  testForm: TestFormType;
}

export default function InTest({ testForm }: InTestProps) {
  const questionSet = testForm.questionSet[0];
  console.log(questionSet);

  return (
    <article id={styles.in_test}>
      <TestHead seconds={5000} progressCount={1} currentCount={3} />

      <section className={styles["question-set"]}>
        <QuestionSetContent
          questionSetTitle={questionSet.questionSetTitle}
          questionSetContent={questionSet.questionSetContent}
        />
        <QuestionList questionList={questionSet.question} />
      </section>

      <section className={styles["question-cta"]}>
        <div className={styles["btn-wrap"]}>
          <CommonBtn isFull={true} size="lg">
            정답 확인
          </CommonBtn>
        </div>
      </section>
    </article>
  );
}
