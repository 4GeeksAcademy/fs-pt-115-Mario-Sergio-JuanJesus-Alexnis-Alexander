import { useState } from "react";

export const useDisabledFields = (rules, initialState) => {
    
  const [disabledFields, setDisabledFields] = useState(initialState);
  
  const updateDisabledFields = (name, value) => {
    if (rules[name] && rules[name][value] !== undefined) {
      setDisabledFields(prev => ({
        ...prev,
        ...rules[name][value],
      }));
    }
  };
  return { disabledFields, updateDisabledFields };
};