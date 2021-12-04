import React from "react";
import styles from "./AppHeader.module.scss";

const AppHeader = () => {
  return (
    <nav className={styles.navPanel}>
      <button className={styles.navBtn}>Результаты чисток</button>
      <button className={styles.navBtn}>Статистика направлений</button>
    </nav>
  )
}

export default AppHeader;