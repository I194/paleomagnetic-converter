import React, { useCallback } from "react";
import styles from "./AppHeader.module.scss";
import { useDispatch } from "../../services/types/hooks";
import { SET_AVAILABLE_FORMATS } from "../../services/actions/files";

const AppHeader = () => {
  
  const dispatch = useDispatch();

  const handleNavBtnClick = useCallback(
    (formats: string[]) => {
      dispatch({type: SET_AVAILABLE_FORMATS, formats: formats})
    },
    [],
  )

  return (
    <nav className={styles.navPanel}>
      <button 
        className={styles.navBtn} 
        onClick={() => handleNavBtnClick(['PMD', 'CSV', 'XLSX'])}
      >
        Результаты чисток
      </button>
      <button 
        className={styles.navBtn}
        onClick={() => handleNavBtnClick(['DIR', 'PMM', 'CSV', 'XLSX'])}
      >
        Статистика направлений
      </button>
    </nav>
  )
}

export default AppHeader;