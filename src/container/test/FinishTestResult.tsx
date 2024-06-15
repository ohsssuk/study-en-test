import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Test.module.css";
import CommonBtn from "@/components/commonBtn";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { formatTime } from "@/lib/common";

interface FinishTestResultProps {
  testForm: TestFormType;
  viewSetHelp: (questionSetId: number) => void;
  deleteAnswerData: () => void;
}

export default function FinishTestResult({
  testForm,
  viewSetHelp,
  deleteAnswerData,
}: FinishTestResultProps) {
  const handleDeleteAnswerData = () => {
    deleteAnswerData();
  };

  const handleViewSetHelp = (questionSetId: number) => {
    viewSetHelp(questionSetId);
  };

  interface CheckListProps {
    questions: QuestionType[];
  }
  const CheckList = ({ questions }: CheckListProps) => {
    return (
      <ul className={styles["question-result-check"]}>
        {questions.map((question) => (
          <li key={question.questionId}>
            {question.isCorrect ? (
              <FontAwesomeIcon icon={faCheck} className="text-green-500" />
            ) : (
              <FontAwesomeIcon icon={faTimes} className="text-red-500" />
            )}
          </li>
        ))}
      </ul>
    );
  };

  const allSeconds = testForm.questionSet.reduce((accumulator, questionSet) => {
    return accumulator + questionSet.seconds;
  }, 0);

  return (
    <article id={styles.finish_test_result}>
      <h2>테스트 결과</h2>

      <div className={styles["all-result"]}>
        <div className={styles["row"]}>
          <p>총 소요 시간</p>
          <p>{formatTime(allSeconds)}</p>
        </div>
        <div className={styles["row"]}>
          <p>문제 세트별 정오답</p>
          <p>
            {testForm.score} / {testForm.questionSet.length}
          </p>
        </div>
      </div>

      <ul className={styles["set-result"]}>
        {testForm.questionSet.map((qSet) => (
          <li key={qSet.questionSetId}>
            <h3>{qSet.questionSetTitle}</h3>
            <div className={styles["row"]}>
              <p>소요 시간</p>
              <div className={styles["question-result-time"]}>
                {formatTime(qSet.seconds)}
              </div>
            </div>
            <div className={styles["row"]}>
              <p>정오답</p>
              {qSet.score} / {qSet.question.length}
              {CheckList({ questions: qSet.question })}
            </div>
            <div className={styles["row"]}>
              <CommonBtn
                size="sm"
                onClick={() => viewSetHelp(qSet.questionSetId)}
              >
                해설 보기
              </CommonBtn>
            </div>
          </li>
        ))}
      </ul>

      <CommonBtn size="lg" onClick={handleDeleteAnswerData}>
        저장된 기록을 지우고 다시 시작
      </CommonBtn>
    </article>
  );
}
