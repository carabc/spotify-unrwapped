import styles from "./Loading.module.css";
import cx from "../../lib/cx";
export default function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.barsContainer}>
        <div className={cx(styles.bar, styles.barOne)}></div>
        <div className={cx(styles.bar, styles.barTwo)}></div>
        <div className={cx(styles.bar, styles.barThree)}></div>
        <div className={cx(styles.bar, styles.barFour)}></div>
        <div className={cx(styles.bar, styles.barFive)}></div>
        <div className={cx(styles.bar, styles.barSix)}></div>
        <div className={cx(styles.bar, styles.barSeven)}></div>
        <div className={cx(styles.bar, styles.barEight)}></div>
      </div>
    </div>
  );
}
