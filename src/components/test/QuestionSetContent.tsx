import styles from "@/container/test/Test.module.css";

interface QuestionSetContentProps {
  questionSetTitle: string;
  questionSetContent: string;
}
export default function QuestionSetContent({
  questionSetTitle,
  questionSetContent,
}: QuestionSetContentProps) {
  return (
    <div className={styles.content}>
      <h3>{questionSetTitle}</h3>
      <p>{questionSetContent}</p>
    </div>
  );
}
