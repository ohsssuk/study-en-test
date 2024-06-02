"use client";

import TestHead from "@/components/test/TestHead";
import CommonBtn from "@/components/commonBtn";
import QuestionList from "@/components/test/QuestionList";
import QuestionSetContent from "@/components/test/QuestionSetContent";

import styles from "./Test.module.css";

import { findItemFromListById } from "@/lib/common";

interface InTestProps {
  questionSet: QuestionSetType;
  isCompleted: boolean;
  checkAnswer: (answerSet: AnswerSetType[]) => void;
  nextSet: () => void;
}

export default function InTest({
  questionSet,
  isCompleted,
  checkAnswer,
  nextSet,
}: InTestProps) {
  const addAnswerSet: AnswerSetType[] = [];

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
    console.log(addAnswerSet);
  };

  const handleClickCTA = () => {
    if (isCompleted) {
      nextSet();
    } else {
      checkAnswer(addAnswerSet);
    }
  };

  return (
    <article id={styles.in_test}>
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
          <CommonBtn isFull={true} size="lg" onClick={handleClickCTA}>
            {isCompleted ? "다음 문제" : "정답 확인"}
          </CommonBtn>
        </div>
      </section>
    </article>
  );
}
