"use client";

import BeforeStartTest from "@/container/test/BeforeStartTest";
import InTest from "./InTest";

import styles from "./Test.module.css";
import { useEffect, useState } from "react";
import { ResultType, fetchData } from "@/lib/callAPI";

export default function Test() {
  const [questionSetIds, setQuestionSetIds] = useState<
    TestType["questionSetIds"]
  >([]);

  useEffect(() => {
    getQuestionSetIds(1);
  }, []);

  useEffect(() => {
    console.log(questionSetIds);
  }, [questionSetIds]);

  const getQuestionSetIds = async (testId: number) => {
    const { status, data }: ResultType<TestType> = await fetchData<TestType>(
      "/testDB.json"
    );

    if (status && data) {
      const { questionSetIds } = data;
      setQuestionSetIds(questionSetIds);
    }
  };

  return (
    <>
      {/* <BeforeStartTest /> */}
      <InTest />
    </>
  );
}
