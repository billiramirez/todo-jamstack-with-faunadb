import React, { useState } from "react";
import axios from "axios";
import styles from "./form.module.css";

/**
 *
 *
 * @param   {Function}  reloadTodos  [cb function for reloading the todos]
 *
 * @return  {JSX}               [Component]
 */
const Form = ({ reloadTodos }) => {
  const [text, setText] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    if (text === "") {
      setSubmitting(false);
      return;
    }

    await axios.post("/api/create-todo", { text });

    setText("");
    reloadTodos();
    setSubmitting(false);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label}>
        Add a Todo
        <input
          type="text"
          className={styles.input}
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isSubmitting}
        />
      </label>
      <button className={styles.button} disabled={isSubmitting}>
        Save Todo
      </button>
    </form>
  );
};

export default Form;
