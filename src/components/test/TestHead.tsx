import styles from "@/container/test/Test.module.css";

interface TestHeadProps {
  seconds: number;
  progressCount: number;
  currentCount: number;
}
export default function TestHead({
  seconds,
  progressCount,
  currentCount,
}: TestHeadProps) {
  const formatTime = (seconds: number): string => {
    const minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = seconds % 60;

    const formattedMinutes: string =
      minutes < 10 ? "0" + minutes : minutes.toString();
    const formattedSeconds: string =
      remainingSeconds < 10
        ? "0" + remainingSeconds
        : remainingSeconds.toString();

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <section className={styles.head}>
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
