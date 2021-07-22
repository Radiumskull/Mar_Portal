import React from "react";

import styles from "./forms.module.css";

const CommonForm = ({ fields, submitHandler }) => {
  const [state, setState] = React.useState(null);
  React.useEffect(() => {
    const newState = {};
    Object.keys(fields).forEach((field) => {
      newState[field] = null;
    });

    setState(newState);
  }, [fields]);

  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    const newState = state;
    newState[name] = value;

    setState(newState);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    submitHandler(state);

    return false;
  };

  return (
    <form className={styles.form}>
      {fields &&
        Object.keys(fields).map((field) => (
          <Input key={field} {...fields[field]} onChange={changeHandler} />
        ))}
      <button type="button" onClick={onSubmit} className={styles.button}>
        Submit
      </button>
    </form>
  );
};

export default CommonForm;

const Input = (props) => {
  const { label, onChange, name, error, type = "text" } = props;
  return (
    <div className={styles.input}>
      <label className={styles.label}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        onChange={onChange}
        autoComplete="off"
      />
      <label className={styles.error}>{error}</label>
    </div>
  );
};
