"use client";

import TestHead from "@/components/test/TestHead";
import CommonBtn from "@/components/commonBtn";
import QuestionList from "@/components/test/QuestionList";
import QuestionSetContent from "@/components/test/QuestionSetContent";

import styles from "./Test.module.css";

import { findItemFromListById } from "@/lib/common";

interface InTestProps {
  questionSet: QuestionSetType;
  answerSet: SetAnswerType[];
  isCompleted: boolean;
  checkAnswer: (answerSet: SetAnswerType[]) => void;
}

export default function InTest({
  questionSet,
  answerSet,
  isCompleted,
  checkAnswer,
}: InTestProps) {
  const addAnswerSet: SetAnswerType[] = [];

  const handleSelectAnswer = (questionId: number, optionId: number) => {
    const findItem = findItemFromListById(
      addAnswerSet,
      "questionId",
      questionId
    );

    if (findItem) {
      findItem.optionId = optionId;
    } else {
      addAnswerSet.push({
        questionId,
        optionId,
      });
    }
  };

  const handleClickCheck = () => {
    checkAnswer(addAnswerSet);
  };

  return (
    <article id={styles.in_test}>
      <TestHead seconds={5000} progressCount={1} currentCount={3} />

      <section className={styles["question-set"]}>
        <QuestionSetContent
          questionSetTitle={questionSet.questionSetTitle}
          questionSetContent={questionSet.questionSetContent}
          questionSetHelp={isCompleted ? questionSet.questionSetHelp : null}
        />
        <QuestionList
          questionList={questionSet.question}
          onChange={handleSelectAnswer}
          isCompleted={isCompleted}
        />
      </section>

      <section className={styles["question-cta"]}>
        <div className={styles["btn-wrap"]}>
          <CommonBtn isFull={true} size="lg" onClick={handleClickCheck}>
            정답 확인
          </CommonBtn>
        </div>
      </section>
    </article>
  );
}
