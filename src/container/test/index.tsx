"use client";

import BeforeStartTest from "@/container/test/BeforeStartTest";
import InTest from "./InTest";

import styles from "./Test.module.css";
import { useEffect, useState } from "react";
import { ResultType, fetchData } from "@/lib/callAPI";
import { findItemFromListById } from "@/lib/common";

export default function Test({ testId }: { testId: number }) {
  const [testForm, setTestForm] = useState<TestFormType | null>(null);
  const [currentQuestionSet, setCurrentQuestionSet] =
    useState<QuestionSetType | null>(null);
  const [currentSetIndex, setCurrentSetIndex] = useState<number>(0);
  const [answerSet, setAnswerSet] = useState<SetAnswerType[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isTestStart, setIsTestStart] = useState<boolean>(true);

  const testAnswer: TestAnswerType[] = [];

  useEffect(() => {
    fetchTestData();
  }, []);

  useEffect(() => {
    setCurrentQuestionSet(testForm?.questionSet[currentSetIndex] ?? null);
    console.log(testForm?.questionSet[currentSetIndex]);
  }, [testForm, currentSetIndex]);

  useEffect(() => {
    gradeTest();
  }, [answerSet]);

  const fetchTestData = async () => {
    const { status, data }: ResultType<TestFormType> =
      await fetchData<TestFormType>("/testDB.json");

    if (status && data) {
      setTestForm(data);
    }
    setIsLoading(false);
  };

  const handleStartTest = () => {
    setIsTestStart(true);
  };

  const handleCheckAnswer = (answerSet: SetAnswerType[]) => {
    setAnswerSet((prevAnswerSet) => {
      const newAnswerSet = [...prevAnswerSet];

      answerSet.map((answer) => {
        const findItem = findItemFromListById(
          newAnswerSet,
          "questionId",
          answer.questionId
        );

        if (findItem) {
          findItem.optionId = answer.optionId;
        } else {
          const { questionId, optionId } = answer;
          newAnswerSet.push({ questionId, optionId });
        }
      });

      return newAnswerSet;
    });
  };

  const gradeTest = () => {
    if (!testForm) {
      return;
    }

    setTestForm((prevTestForm) => {
      if (!prevTestForm) {
        return null;
      }

      const newTestForm = { ...prevTestForm };
      const { questionSet: newQuestionSet } = newTestForm;
      newQuestionSet.forEach((set) => {
        set.score = 0;
        set.question.forEach((question) => {
          const findAnswer = findItemFromListById(
            answerSet,
            "questionId",
            question.questionId
          );

          if (findAnswer) {
            question.questionUserSelectedOptionId = findAnswer.optionId;
          }

          if (
            question.questionUserSelectedOptionId ===
            question.questionCorrectOptionId
          ) {
            question.isCorrect = true;
            set.score++;
          } else {
            question.isCorrect = false;
          }
        });
      });

      return newTestForm;
    });
  };

  if (isLoading || !currentQuestionSet) {
    return <div>Loading...</div>;
  } else if (!testForm) {
    return <div>문제가 생겨 테스트 정보를 불러오지 못했습니다.</div>;
  }

  return (
    <>
      {isTestStart ? (
        <InTest
          questionSet={currentQuestionSet}
          checkAnswer={handleCheckAnswer}
          answerSet={answerSet}
          isCompleted={true}
        />
      ) : (
        <BeforeStartTest onClick={handleStartTest} />
      )}
    </>
  );
}
