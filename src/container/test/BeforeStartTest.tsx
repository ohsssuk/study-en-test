"use client";

import styles from "./Test.module.css";
import { useEffect } from "react";
import { BgEffect } from "@/lib/bgEffect";

import CommonBtn from "@/components/commonBtn";

interface BeforeStartTestProps {
  onClick: () => void;
}

export default function BeforeStartTest({ onClick }: BeforeStartTestProps) {
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

  const handleClick = () => {
    onClick();
  };

  return (
    <>
      <canvas id="bg_effect" className="fixed inset-0 w-full h-full"></canvas>
      <article id={styles.before_start_test}>
        <h2>Start Test!</h2>
        <CommonBtn size="lg" onClick={handleClick}>
          테스트 시작
        </CommonBtn>
      </article>
    </>
  );
}
