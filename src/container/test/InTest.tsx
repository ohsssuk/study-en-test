"use client";

import styles from "./Test.module.css";

import CommonBtn from "@/components/commonBtn";

interface InTestProps {
  testForm: TestFormType;
}

export default function InTest({ testForm }: InTestProps) {
  return (
    <>
      <article id={styles.test}>작업중</article>
    </>
  );
}
