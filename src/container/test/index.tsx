"use client";

import BeforeStartTest from "@/container/test/BeforeStartTest";
import InTest from "./InTest";

import styles from "./Test.module.css";
import { useEffect, useState } from "react";
import { ResultType, fetchData } from "@/lib/callAPI";
import { findItemFromListById } from "@/lib/common";
import TestHead from "@/components/test/TestHead";
import FinishTestResult from "./FinishTestResult";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading";
import {
  clearLocalStorage,
  loadDataFromLocalStorage,
  saveDataToLocalStorage,
} from "@/lib/storage";

enum TestStatus {
  BEFORE_TEST = 1,
  IN_TEST = 2,
  FINISH_TEST = 3,
}

enum StorageKey {
  TIME = "testQuestionSetTime",
  ANSWER = "testQuestionAnswer",
}

let partSeconds: number = 0; // 세트별 경과 시간
let answerSet: AnswerSetType[] = []; // 테스트 답안 전체 데이터
let timeSet: TimeSetType[] = []; // 테스트 답안 소요 시간

export default function Test({ testId }: { testId: number }) {
  const router = useRouter();

  // 표시
  const [testForm, setTestForm] = useState<TestFormType | null>(null); // 전체 데이터
  const [currentQuestionSet, setCurrentQuestionSet] =
    useState<QuestionSetType | null>(null); // 현재 표시되는 문제 세트
  const [currentSetIndex, setCurrentSetIndex] = useState<number>(0); // 현재 문제 세트 index

  // 사용자 기록
  const [testStatus, setTestStatus] = useState<TestStatus>(
    TestStatus.BEFORE_TEST
  ); // 현태 테스트 진행 상태
  const [initSeconds, setInitSeconds] = useState<number>(0);

  // UX
  const [isTimerOn, setIsTimerOn] = useState<boolean>(false); // 타이머 진행중
  const [isExsistSavedData, setIsExsistSavedData] = useState<boolean>(false); // 진행중이던 테스트가 있는지

  useEffect(() => {
    fetchSavedData();
    fetchTestData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isTimerOn) {
        partSeconds++;
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerOn]);

  useEffect(() => {
    if (!testForm) {
      return;
    }

    setCurrentQuestionSet(testForm.questionSet[currentSetIndex]);
  }, [testForm, currentSetIndex]);

  const fetchTestData = async () => {
    const { status, data }: ResultType<TestFormType> =
      await fetchData<TestFormType>("/testDB.json");

    if (status && data) {
      setTestForm(data);
    }
  };

  const fetchSavedData = () => {
    answerSet = loadDataFromLocalStorage(StorageKey.ANSWER, answerSet);
    timeSet = loadDataFromLocalStorage(StorageKey.TIME, timeSet);

    if (timeSet.length > 0) {
      setIsExsistSavedData(true);
    }
  };

  const handleStartTest = () => {
    setTestStatus(TestStatus.IN_TEST);

    if (isExsistSavedData) {
      loadExistData();
    } else {
      setIsTimerOn(true);
    }
  };

  const loadExistData = () => {
    setInitSeconds(
      timeSet.reduce((accumulator, set) => {
        return accumulator + set.seconds;
      }, 0)
    );
    gradeTest();

    if (testForm?.isCompleted) {
      setTestStatus(TestStatus.FINISH_TEST);
    } else {
      setCurrentSetIndex(timeSet.length);
      setIsTimerOn(true);
    }
  };

  const handleNextSet = () => {
    partSeconds = 0;

    if (getIsLastSet()) {
      setTestStatus(TestStatus.FINISH_TEST);
    } else {
      setCurrentSetIndex((prevIndex) => {
        return prevIndex + 1;
      });
      setTestStatus(TestStatus.IN_TEST);

      if (!testForm?.isCompleted) {
        setIsTimerOn(true);
      }
    }
  };

  const handleCheckAnswer = (addAnswerSet: AnswerSetType[]) => {
    setIsTimerOn(false);

    // 답안 전체 기록 갱신
    addAnswerSet.map((add) => {
      const { questionId, optionId } = add;
      answerSet.push({ questionId, optionId });
    });

    // 소요시간 전체 갱신
    if (currentQuestionSet) {
      timeSet.push({
        questionSetId: currentQuestionSet.questionSetId,
        seconds: partSeconds,
      });
    }

    saveDataToLocalStorage(StorageKey.TIME, timeSet);
    saveDataToLocalStorage(StorageKey.ANSWER, answerSet);

    gradeTest(); // 저장된 시간 기록과 답안지를 가지고 채점
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
      newTestForm.score = 0;

      const { questionSet: newQuestionSet } = newTestForm;
      newTestForm.isCompleted = timeSet.length === newQuestionSet.length;

      newQuestionSet.forEach((set) => {
        const findTime = findItemFromListById(
          timeSet,
          "questionSetId",
          set.questionSetId
        );
        if (findTime) {
          set.seconds = findTime.seconds;
          set.isCompleted = true; // 시간 기록이 있으면 완료로 간주함
        }

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

        if (set.score === set.question.length) {
          newTestForm.score++;
        }
      });

      return newTestForm;
    });
  };

  const handleViewSetHelp = (questionSetId: number) => {
    if (!testForm) {
      return;
    }

    setIsTimerOn(false);
    setInitSeconds(
      timeSet.reduce((accumulator, set) => {
        return accumulator + set.seconds;
      }, 0)
    );

    const findSet = findItemFromListById(
      testForm.questionSet,
      "questionSetId",
      questionSetId
    );

    const findIndex = testForm.questionSet.findIndex(
      (set) => set.questionSetId === questionSetId
    );
    if (findIndex === -1) {
      return;
    }

    setCurrentSetIndex(findIndex);
    setTestStatus(TestStatus.IN_TEST);
  };

  const handleDeleteAnswerData = () => {
    clearLocalStorage(StorageKey.TIME);
    clearLocalStorage(StorageKey.ANSWER);
    answerSet.length = 0;
    timeSet.length = 0;
    setInitSeconds(0);
    fetchTestData();
    setCurrentSetIndex(0);
    setIsExsistSavedData(false);
    setTestStatus(TestStatus.BEFORE_TEST);
    partSeconds = 0;
  };

  const getIsLastSet = (): boolean => {
    return currentSetIndex + 1 === testForm?.questionSet.length;
  };

  if (!testForm) {
    return <Loading />;
  }

  return (
    <>
      {testStatus === TestStatus.IN_TEST && currentQuestionSet ? (
        <>
          <TestHead
            initSeconds={initSeconds}
            isTimerOn={isTimerOn}
            progressCount={testForm.questionSet.length}
            currentCount={currentSetIndex + 1}
          />
          <InTest
            questionSet={currentQuestionSet}
            checkAnswer={handleCheckAnswer}
            nextSet={handleNextSet}
            buttonCTAText={
              currentQuestionSet.isCompleted
                ? getIsLastSet()
                  ? "결과 확인"
                  : "다음 문제"
                : getIsLastSet()
                ? "테스트 종료"
                : "다음 문제"
            }
          />
        </>
      ) : testStatus === TestStatus.BEFORE_TEST ? (
        <BeforeStartTest
          startTest={handleStartTest}
          isExsistSavedData={isExsistSavedData}
        />
      ) : (
        <FinishTestResult
          testForm={testForm}
          viewSetHelp={handleViewSetHelp}
          deleteAnswerData={handleDeleteAnswerData}
        />
      )}
    </>
  );
}
