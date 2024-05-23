import { useState } from "react";

export const useForm = <T extends Object>(initialValues: T) => {
  const [formInfo, setFormInfo] = useState(initialValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormInfo({
      ...formInfo,
      [name]: value,
    });
  };

  return [formInfo, handleChange] as const;
};
