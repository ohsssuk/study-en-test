import styles from "@/container/test/Test.module.css";
import Question from "@/components/test/Question";

interface QuestionListProps {
  questionList: QuestionType[];
  isCompleted?: boolean;
  onChange: (questionId: number, optionId: number) => void;
}
export default function QuestionList({
  questionList,
  isCompleted = false,
  onChange,
}: QuestionListProps) {
  return (
    <ul className={styles["question-list"]}>
      {questionList.map((question) => (
        <Question
          key={question.questionId}
          question={question}
          isCompleted={isCompleted}
          onChange={onChange}
        />
      ))}
    </ul>
  );
}
