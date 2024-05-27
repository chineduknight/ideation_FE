import React, { useState } from "react";
import {
  Box,
  Input,
  Button,
  Flex,
  Heading,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import { useForm } from "../utils/form";
import { useNavigate } from "react-router-dom";
import { postRequest } from "services/api/apiHelper";
import { authRequest } from "services";
import { useMutation } from "@tanstack/react-query";
import { PUBLIC_PATHS } from "routes/pagePath";

const ForgotPassword: React.FC = () => {
  const [formInfo, handleChange] = useForm({
    email: "",
  });
  const [errors, setErrors] = useState<{ email?: string }>({});
  const navigate = useNavigate();

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: postRequest,
    onSuccess: () => {
      toast.success("Password reset link sent to your email");
      navigate(PUBLIC_PATHS.FORGOT_PASSWORD_CONFIRM);
    },
    onError: (error: any) => {
      toast.error(error.response.data.error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formInfo.email) {
      setErrors({ email: "Email is required" });
      return;
    }
    const baseUrl = window.location.origin;

    mutate({
      url: authRequest.FORGOT_PASSWORD,
      data: {
        email: formInfo.email,
        url: baseUrl + PUBLIC_PATHS.RESET_PASSWORD,
      },
    });
  };

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
        Forgot Password
      </Heading>
      <Box mt="5rem">
        <form onSubmit={handleSubmit} style={{ width: "270px" }}>
          <FormControl isInvalid={!!errors.email} mb="1rem">
            <Input
              placeholder="Email"
              name="email"
              type="email"
              value={formInfo.email}
              onChange={handleChange}
              w="100%"
            />
            {!errors.email ? null : (
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            )}
          </FormControl>
          <Button
            mt="1rem"
            fontWeight="bold"
            fontSize="20px"
            padding="1rem 3rem"
            type="submit"
            isLoading={isLoading}
          >
            Send Reset Link
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default ForgotPassword;
