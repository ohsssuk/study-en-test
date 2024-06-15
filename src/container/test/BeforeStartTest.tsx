"use client";

import styles from "./Test.module.css";
import { useEffect } from "react";
import { BgEffect } from "@/lib/bgEffect";

import CommonBtn from "@/components/commonBtn";

interface BeforeStartTestProps {
  startTest: () => void;
  isExsistSavedData: boolean;
}

export default function BeforeStartTest({
  startTest,
  isExsistSavedData,
}: BeforeStartTestProps) {
  useEffect(() => {
    new BgEffect({
      canvasId: "bg_effect",
      colorSet: [
        "rgb(205, 232, 229, 0.4)",
        "rgb(238, 247, 255, 0.4)",
        "rgb(122, 178, 178, 0.4)",
        "rgb(77, 134, 156, 0.4)",
      ],
      particleCount: 20,
      particleSize: 200,
    });
  }, []);

  const handleClickStartTest = () => {
    startTest();
  };

  return (
    <>
      <canvas id="bg_effect" className="fixed inset-0 w-full h-full"></canvas>
      <article id={styles.before_start_test}>
        <h2>{!isExsistSavedData ? "Start" : "Continue"} Test!</h2>
        <CommonBtn size="lg" onClick={handleClickStartTest}>
          {!isExsistSavedData ? "테스트 시작" : "이어서 계속 하기"}
        </CommonBtn>
      </article>
    </>
  );
}
