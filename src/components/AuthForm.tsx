import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../redux/slices/authSlice";
import { RootState, AppDispatch } from "../redux/store";
import {
  Box,
  Input,
  Button,
  Text,
  Flex,
  Heading,
  Checkbox,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import { validateForm, UserTypeError } from "../utils/validation";
import { useForm } from "../utils/form";
import { useNavigate } from "react-router-dom";

interface AuthFormProps {
  type: "login" | "register";
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [formInfo, handleChange] = useForm({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<UserTypeError>({});
  const dispatch = useDispatch<AppDispatch>();
  const { error } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const isLogin = type === "login";

  useEffect(() => {
    setErrors({});
  }, [type]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(formInfo, type);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      if (isLogin) {
        dispatch(
          loginUser({
            username: formInfo.username,
            password: formInfo.password,
          })
        )
          .unwrap()
          .then(() => {
            toast.success("Login Successful");
          })
          .catch(() => {
            toast.error(error);
          });
      } else {
        dispatch(
          registerUser({
            username: formInfo.username,
            email: formInfo.email,
            password: formInfo.password,
          })
        )
          .unwrap()
          .then(() => {
            toast.success("Registration Successful");
          })
          .catch(() => {
            toast.error(error);
          });
      }
    }
  };

  const formFields = [
    { name: "username", placeholder: "Username", label: "Username" },
    ...(type === "register"
      ? [{ name: "email", placeholder: "Email", label: "Email" }]
      : []),
    {
      name: "password",
      placeholder: "Password",
      label: "Password",
      type: "password",
    },
  ];

  return (
    <Flex
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      width={{ base: "100%", md: "400px" }}
      textAlign="center"
      margin="auto"
    >
      <Heading mt="10rem" color="primary">
        {isLogin ? "Login to your Account" : "Create Account"}
      </Heading>
      <Box mt="5rem">
        <form onSubmit={handleSubmit} style={{ width: "270px" }}>
          {formFields.map((field) => (
            <FormControl
              key={field.name}
              isInvalid={!!errors[field.name]}
              mb="1rem"
            >
              <Input
                placeholder={field.placeholder}
                name={field.name}
                type={field.type || "text"}
                value={(formInfo as any)[field.name]}
                onChange={handleChange}
                w="100%"
              />
              {!errors[field.name] ? null : (
                <FormErrorMessage>{errors[field.name]}</FormErrorMessage>
              )}
            </FormControl>
          ))}
          {type === "register" && (
            <Flex>
              <Checkbox mr="1rem" />
              <Text>I agree to the</Text>
              <Text color="primary" ml="0.3rem">
                terms and conditions
              </Text>
            </Flex>
          )}
          <Button
            mt="1rem"
            fontWeight="bold"
            fontSize="20px"
            padding="1rem 3rem"
            type="submit"
          >
            {isLogin ? "Login" : "Sign Up"}
          </Button>
        </form>
      </Box>
      <Flex mt="2rem" justifyContent="center">
        <Text>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
        </Text>
        <Button
          ml="0.2rem"
          variant="link"
          onClick={() => navigate(isLogin ? "/register" : "/login")}
          color="primary"
        >
          {isLogin ? "Sign Up" : "Sign In"}
        </Button>
      </Flex>
    </Flex>
  );
};

export default AuthForm;
