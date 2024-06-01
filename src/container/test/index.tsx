"use client";

import BeforeStartTest from "@/container/test/BeforeStartTest";
import InTest from "./InTest";

import styles from "./Test.module.css";
import { useEffect, useState } from "react";
import { ResultType, fetchData } from "@/lib/callAPI";

export default function Test({ testId }: { testId: number }) {
  const [testForm, setTestForm] = useState<TestFormType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isTestStart, setIsTestStart] = useState<boolean>(true);

  useEffect(() => {
    fetchTestData();
  }, []);

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

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (!testForm) {
    return <div>문제가 생겨 테스트 정보를 불러오지 못했습니다.</div>;
  }

  return (
    <>
      {isTestStart ? (
        <InTest testForm={testForm} />
      ) : (
        <BeforeStartTest onClick={handleStartTest} />
      )}
    </>
  );
}
