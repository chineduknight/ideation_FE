import React, { useEffect, useState } from "react";
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
import {
  getRequest,
  postRequest,
  useMutationWrapper,
} from "services/api/apiHelper";
import { authRequest } from "services";
import { PUBLIC_PATHS } from "routes/pagePath";
import { useMutation } from "@tanstack/react-query";
import { setToken, setUser } from "../redux/slices/authSlice";
import { setItem } from "utils/storage";
import { useDispatch } from "react-redux";
import { AppDispatch } from "redux/store";

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
  const navigate = useNavigate();
  const isLogin = type === "login";
  useEffect(() => {
    setErrors({});
  }, [type]);

  const dispatch = useDispatch<AppDispatch>();
  const onSuccess = () => {
    toast.success("Registration Successful");
    navigate(PUBLIC_PATHS.REGISTER_SUCCESSFUL);
  };

  const { mutate } = useMutationWrapper(postRequest, onSuccess);

  const loginMutation = useMutation({
    mutationFn: postRequest,
    onSuccess: async (data) => {
      const { token } = data.data;
      dispatch(setToken(token));
      await setItem("token", token);

      const userResponse = await getRequest({ url: authRequest.ME });
      dispatch(setUser(userResponse.data));
      await setItem("currentUser", userResponse.data);

      toast.success("Login Successful");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(formInfo, type);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      if (isLogin) {
        const data = {
          userNameOrEmail: formInfo.username,
          password: formInfo.password,
        };

        loginMutation.mutate({ url: authRequest.LOGIN, data });
      } else {
        const baseUrl = window.location.origin;
        const data = {
          username: formInfo.username,
          email: formInfo.email,
          password: formInfo.password,
          url: baseUrl + PUBLIC_PATHS.VERIFY_EMAIL,
        };
        mutate({ url: authRequest.REGISTER, data });
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
