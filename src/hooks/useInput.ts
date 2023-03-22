import { useState, useEffect } from "react";

type Validations = {
  minLength?: number;
  isEmpty?: boolean;
};

type ValidationErrors = {
  isEmpty: boolean;
  minLength: boolean;
  error: boolean;
};

export const useValidation = (
  value: string,
  validations: Validations
): ValidationErrors => {
  const [isEmpty, setEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case "minLength":
          if (value.length < validations[validation]!) {
            setMinLengthError(true);
            setError(true);
          } else {
            setError(false);
            setMinLengthError(false);
          }
          break;
        case "isEmpty":
          if (value) {
            setEmpty(false);
            setError(false);
          } else {
            setEmpty(true);
            setError(true);
          }
          break;
        default:
          break;
      }
    }
  }, [value, validations]);

  return {
    isEmpty,
    minLength: minLengthError,
    error,
  };
};

export const useInput = (initialValue: string, validations: Validations) => {
  const [value, setValue] = useState(initialValue);
  const [dirty, setDirty] = useState(false);
  const valid = useValidation(value, validations);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  function onBlur(e: React.FocusEvent<HTMLInputElement>) {
    setDirty(true);
  }

  return {
    value,
    onChange,
    onBlur,
    ...valid,
    dirty,
  };
};

const email = useInput("", {
  isEmpty: true,
  minLength: 3,
});
