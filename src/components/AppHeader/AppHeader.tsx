import React, { useCallback, useEffect, useState } from "react";
import styles from "./AppHeader.module.scss";
import { useDispatch } from "../../services/types/hooks";
import { SET_AVAILABLE_FORMATS, SET_INPUT_FILES } from "../../services/actions/files";

const AppHeader = () => {

  const dispatch = useDispatch();

  const [activeBtn, setActiveBtn] = useState(1);

  useEffect(() => {document.title = 'Конвертер палеомагнитных данных > Статистика направлений'}, []);

  const handleNavBtnClick = useCallback(
    (formats: string[], pageName, btnNum) => {
      dispatch({type: SET_AVAILABLE_FORMATS, formats: formats});
      dispatch({type: SET_INPUT_FILES, files: []});
      document.title = `Конвертер палеомагнитных данных > ${pageName}`;
      setActiveBtn(btnNum);
    },
    [],
  )

  return (
    <nav className={styles.navPanel}>
      <button 
        className={activeBtn === 0 ? `${styles.navBtn} ${styles.active}` : styles.navBtn} 
        onClick={() => handleNavBtnClick(['PMD', 'CSV', 'XLSX'], 'Результаты чисток', 0)}
      >
        Результаты чисток
      </button>
      <button 
        className={activeBtn === 1 ? `${styles.navBtn} ${styles.active}` : styles.navBtn}
        onClick={() => handleNavBtnClick(['DIR', 'PMM', 'CSV', 'XLSX'], 'Статистика направлений', 1)}
      >
        Статистика направлений
      </button>
    </nav>
  )
}

export default AppHeader;