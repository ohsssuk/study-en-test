import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import styles from "./Loading.module.css";

export default function Loading() {
  return (
    <div className={styles["loading-container"]}>
      <div>
        <FontAwesomeIcon icon={faSpinner} />
      </div>
    </div>
  );
}
