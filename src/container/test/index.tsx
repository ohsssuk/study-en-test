"use client";

import BeforeStartTest from "@/container/test/BeforeStartTest";
import InTest from "./InTest";

import styles from "./Test.module.css";
import { useEffect, useState } from "react";
import { ResultType, fetchData } from "@/lib/callAPI";
import { findItemFromListById } from "@/lib/common";
import TestHead from "@/components/test/TestHead";
import FinishTestResult from "./FinishTestResult";

enum TestStatus {
  BEFORE_TEST = 1,
  IN_TEST_PROGRESS = 2,
  IN_TEST_COMPLETED = 3,
  FINISH_TEST = 4,
}

export default function Test({ testId }: { testId: number }) {
  // 표시
  const [testForm, setTestForm] = useState<TestFormType | null>(null); // 전체 데이터
  const [currentQuestionSet, setCurrentQuestionSet] =
    useState<QuestionSetType | null>(null); // 현재 표시되는 문제 세트
  const [currentSetIndex, setCurrentSetIndex] = useState<number>(0); // 현재 문제 세트 index

  // 사용자 기록
  const [testStatus, setTestStatus] = useState<TestStatus>(
    TestStatus.BEFORE_TEST
  ); // 현태 테스트 상태
  const [answerSet, setAnswerSet] = useState<AnswerSetType[]>([]); // 테스트 답안 전체 데이터

  // UX
  const [isLoading, setIsLoading] = useState<boolean>(true); // 로딩
  const [isTimerOn, setIsTimerOn] = useState<boolean>(false); // 타이머 진행중

  let seconds = 0; // 경과 시간 데이터

  useEffect(() => {
    fetchTestData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isTimerOn) {
        seconds++;
        console.log(seconds);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerOn]);

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
    setTestStatus(TestStatus.IN_TEST_PROGRESS);
    setIsTimerOn(true);
  };

  const handleNextSet = () => {
    if (getIsLastSet()) {
      setTestStatus(TestStatus.FINISH_TEST);
    } else {
      setCurrentSetIndex((prevIndex) => {
        return prevIndex + 1;
      });
      setTestStatus(TestStatus.IN_TEST_PROGRESS);
      setIsTimerOn(true);
    }
  };

  const handleCheckAnswer = (answerSet: AnswerSetType[]) => {
    // 답안 전체 기록 갱신
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

    setTestStatus(TestStatus.IN_TEST_COMPLETED);
    setIsTimerOn(false);
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

  const getIsLastSet = (): boolean => {
    return currentSetIndex + 1 === testForm?.questionSet.length;
  };

  return (
    <>
      {testStatus === TestStatus.IN_TEST_PROGRESS ||
      testStatus === TestStatus.IN_TEST_COMPLETED ? (
        <>
          <TestHead
            initSeconds={seconds}
            isTimerOn={isTimerOn}
            progressCount={testForm.questionSet.length}
            currentCount={currentSetIndex + 1}
          />
          <InTest
            questionSet={currentQuestionSet}
            checkAnswer={handleCheckAnswer}
            nextSet={handleNextSet}
            isCompleted={testStatus === TestStatus.IN_TEST_COMPLETED}
          />
        </>
      ) : testStatus === TestStatus.BEFORE_TEST ? (
        <BeforeStartTest onClick={handleStartTest} />
      ) : (
        <FinishTestResult
          questionSet={testForm.questionSet}
          viewSetHelp={function (questionSetId: number): void {
            console.log(1);
          }}
          deleteAnswerData={function (): void {
            console.log(2);
          }}
        />
      )}
    </>
  );
}
