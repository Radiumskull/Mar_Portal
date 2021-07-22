import React from "react";
import styles from "./dialog.module.css";

const Dialog = ({ children, active, closeHandler }) => {
  const dialogRef = React.useRef(null);
  const clickHandler = (e) => {
    if (dialogRef.current.contains(e.target)) {
      return;
    }

    closeHandler();
  };
  return (
    <div
      className={`${styles.backdrop} ${!active && styles.hide}`}
      onClick={clickHandler}
    >
      <div className={styles.root} ref={dialogRef}>
        {children}
      </div>
    </div>
  );
};

export default Dialog;
