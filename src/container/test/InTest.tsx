"use client";

import TestHead from "@/components/test/TestHead";
import CommonBtn from "@/components/commonBtn";
import QuestionList from "@/components/test/QuestionList";
import QuestionSetContent from "@/components/test/QuestionSetContent";

import styles from "./Test.module.css";

import { findItemFromListById } from "@/lib/common";

interface InTestProps {
  questionSet: QuestionSetType;
  buttonCTAText: string;
  checkAnswer: (answerSet: AnswerSetType[]) => void;
  nextSet: () => void;
}

export default function InTest({
  questionSet,
  buttonCTAText,
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
  };

  const handleClickCTA = () => {
    if (questionSet.isCompleted) {
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
          questionSetHelp={
            questionSet.isCompleted ? questionSet.questionSetHelp : null
          }
        />
        <QuestionList
          questionList={questionSet.question}
          onChange={handleSelectAnswer}
          isCompleted={questionSet.isCompleted}
        />
      </section>

      <section className={styles["question-cta"]}>
        <div className={styles["btn-wrap"]}>
          <CommonBtn isFull={true} size="lg" onClick={handleClickCTA}>
            {buttonCTAText}
          </CommonBtn>
        </div>
      </section>
    </article>
  );
}
