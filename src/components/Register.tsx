import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/slices/authSlice";
import { RootState, AppDispatch } from "../redux/store";
import { Box, Input, Button, Text } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { validateForm, UserTypeError } from "../utils/validation";
import { useForm } from "../utils/form";

const Register: React.FC = () => {
  const [formInfo, handleChange] = useForm({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<UserTypeError>({});
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector((state: RootState) => state.auth.error);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(formInfo, "register");
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      dispatch(registerUser(formInfo));
      toast.success("Registration Successful");
    }
  };

  const formData = [
    {
      name: "username",
      value: formInfo.username,
    },
    {
      name: "email",
      value: formInfo.email,
    },
    {
      name: "password",
      value: formInfo.password,
    },
  ];

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        {formData.map((formItem) => {
          const name = formItem.name;
          return (
            <Fragment key={name}>
              <Input
                placeholder={name}
                value={formItem.value}
                name={name}
                onChange={handleChange}
              />
              {errors[name] && <Text color="red">{errors[name]}</Text>}
            </Fragment>
          );
        })}
        <Button type="submit">Register</Button>
      </form>
      {error && <Text color="red">{error}</Text>}
    </Box>
  );
};

export default Register;
