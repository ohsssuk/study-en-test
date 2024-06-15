import styles from "@/container/test/Test.module.css";
import { ReactNode } from "react";

interface QuestionSetContentProps {
  questionSetTitle: string;
  questionSetContent: string;
  questionSetHelp: QuestionSetHelpType | null;
}
export default function QuestionSetContent({
  questionSetTitle,
  questionSetContent,
  questionSetHelp = null,
}: QuestionSetContentProps) {
  return (
    <>
      <div className={styles.content}>
        <h3>{questionSetTitle}</h3>
        <div className={styles.detail}>
          <p>{questionSetContent}</p>
          {questionSetHelp && (
            <div className={styles.help}>
              {questionSetHelp.content && (
                <p
                  dangerouslySetInnerHTML={{ __html: questionSetHelp.content }}
                />
              )}
              {questionSetHelp.words && questionSetHelp.words.length > 0 && (
                <ul className={styles.words}>
                  {questionSetHelp.words.map((word, index) => (
                    <li key={index}>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: word,
                        }}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
