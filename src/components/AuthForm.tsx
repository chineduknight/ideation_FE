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
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
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
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<UserTypeError>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  const { mutate, isPending: isRegisterLoading } = useMutationWrapper(
    postRequest,
    onSuccess
  );

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
    if (type === "register" && formInfo.password !== formInfo.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }
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
    {
      name: "username",
      placeholder: "Username",
      label: "Username",
      type: "text",
    },
    ...(type === "register"
      ? [{ name: "email", placeholder: "Email", label: "Email", type: "text" }]
      : []),
    {
      name: "password",
      placeholder: "Password",
      label: "Password",
      type: "password",
    },
    ...(type === "register"
      ? [
          {
            name: "confirmPassword",
            placeholder: "Confirm Password",
            label: "Confirm Password",
            type: "password",
          },
        ]
      : []),
  ];
  console.log("formFields:", formFields);

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
              <InputGroup>
                <Input
                  placeholder={field.placeholder}
                  name={field.name}
                  type={
                    (field.name === "password" && showPassword) ||
                    (field.name === "confirmPassword" && showConfirmPassword)
                      ? "text"
                      : field.type
                  }
                  // type={field.name}
                  value={(formInfo as any)[field.name]}
                  onChange={handleChange}
                  w="100%"
                />
                {(field.name === "password" ||
                  field.name === "confirmPassword") && (
                  <InputRightElement>
                    <IconButton
                      variant="ghost"
                      aria-label="Toggle Password Visibility"
                      _hover={{
                        background: "none",
                      }}
                      icon={
                        (field.name === "password" && showPassword) ||
                        (field.name === "confirmPassword" &&
                          showConfirmPassword) ? (
                          <ViewOffIcon />
                        ) : (
                          <ViewIcon />
                        )
                      }
                      onClick={() => {
                        if (field.name === "password") {
                          setShowPassword(!showPassword);
                        } else {
                          setShowConfirmPassword(!showConfirmPassword);
                        }
                      }}
                    />
                  </InputRightElement>
                )}
              </InputGroup>
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
            isLoading={isLogin ? loginMutation.isPending : isRegisterLoading}
          >
            {isLogin ? "Login" : "Sign Up"}
          </Button>
        </form>
      </Box>
      {isLogin && (
        <Flex mt="1rem" justifyContent="center">
          <Button
            variant="link"
            onClick={() => navigate(PUBLIC_PATHS.FORGOT_PASSWORD)}
            color="primary"
          >
            Forgot Password?
          </Button>
        </Flex>
      )}
      <Flex mt="2rem" justifyContent="center">
        <Text>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
        </Text>
        <Button
          ml="0.2rem"
          variant="link"
          onClick={() =>
            navigate(isLogin ? PUBLIC_PATHS.REGISTER : PUBLIC_PATHS.LOGIN)
          }
          color="primary"
        >
          {isLogin ? "Sign Up" : "Sign In"}
        </Button>
      </Flex>
    </Flex>
  );
};

export default AuthForm;
