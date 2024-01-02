import { memo } from "react";
import styles from "./ErrorComponent.module.css";

function ErrorComponent({ error }: { error: string }) {
  return <div className={styles.error}>{error}</div>;
}

export default memo(ErrorComponent);
