"use client";

import styles from "@/container/test/Test.module.css";
import { formatTime } from "@/lib/common";
import { useEffect, useState } from "react";

interface TestHeadProps {
  initSeconds: number;
  progressCount: number;
  currentCount: number;
  isTimerOn: boolean;
}
export default function TestHead({
  initSeconds,
  progressCount,
  currentCount,
  isTimerOn,
}: TestHeadProps) {
  const [seconds, setSeconds] = useState<number>(initSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isTimerOn) {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerOn]);

  return (
    <section id={styles["test_head"]}>
      <div className={styles.timer}>
        <p>소요 시간</p>
        <p>{formatTime(seconds)}</p>
      </div>
      <div className={styles.progress}>
        <p>진행</p>
        <p>
          {currentCount}/{progressCount}
        </p>
      </div>
    </section>
  );
}
