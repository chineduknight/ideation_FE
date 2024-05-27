import React, { useState } from "react";
import {
  Box,
  Input,
  Button,
  Flex,
  Heading,
  FormControl,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { toast } from "react-toastify";
import { useForm } from "../utils/form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { putRequest } from "services/api/apiHelper";
import { authRequest } from "services";
import { useMutation } from "@tanstack/react-query";
import { PUBLIC_PATHS } from "routes/pagePath";

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [formInfo, handleChange] = useForm({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
  }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: putRequest,
    onSuccess: () => {
      toast.success("Password has been reset successfully");
      navigate(PUBLIC_PATHS.LOGIN);
    },
    onError: (error: any) => {
      setErrors({ password: error.response.data.message });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors: { password?: string; confirmPassword?: string } =
      {};
    if (!formInfo.password) {
      validationErrors.password = "Password is required";
    }
    if (formInfo.password !== formInfo.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      mutate({
        url: `${authRequest.RESET_PASSWORD}/${token}`,
        data: { password: formInfo.password },
      });
    }
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
        Reset Password
      </Heading>
      <Box mt="5rem">
        <form onSubmit={handleSubmit} style={{ width: "270px" }}>
          <FormControl isInvalid={!!errors.password} mb="1rem">
            <InputGroup>
              <Input
                placeholder="New Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formInfo.password}
                onChange={handleChange}
                w="100%"
              />
              <InputRightElement>
                <IconButton
                  variant="ghost"
                  aria-label="Toggle Password Visibility"
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={() => setShowPassword(!showPassword)}
                />
              </InputRightElement>
            </InputGroup>
            {!errors.password ? null : (
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.confirmPassword} mb="1rem">
            <InputGroup>
              <Input
                placeholder="Confirm Password"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formInfo.confirmPassword}
                onChange={handleChange}
                w="100%"
              />
              <InputRightElement>
                <IconButton
                  variant="ghost"
                  aria-label="Toggle Password Visibility"
                  icon={showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              </InputRightElement>
            </InputGroup>
            {!errors.confirmPassword ? null : (
              <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
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
            Reset Password
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default ResetPassword;
