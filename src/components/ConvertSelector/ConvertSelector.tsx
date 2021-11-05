import React from "react";
import styles from "./ConvertSelector.module.scss";

const ConvertSelector = () => {



  return (
    <div className={styles.selectBlock}>
      <div className={styles.horizontalGroup}>
        <button className={`${styles.btn} ${styles.btn__basic}`}>DIR</button>
        <button className={`${styles.btn} ${styles.btn__basic}`}>CSV</button>
        <button className={`${styles.btn} ${styles.btn__basic}`}>XLSX</button>
      </div>
    </div>
  )
}

export default ConvertSelector;