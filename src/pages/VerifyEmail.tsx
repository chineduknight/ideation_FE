import React, { useEffect, useState } from "react";
import { Box, Flex, Heading, Text, Button } from "@chakra-ui/react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PUBLIC_PATHS } from "routes/pagePath";
import { useQueryWrapper } from "services/api/apiHelper";
import { authRequest } from "services";

const VerifyEmailResult: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState<string>("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  const onSuccess = (data) => {
    setMessage(data.data);
    toast.success(data.data);
  };
  const onError = (data) => {
    setMessage(data.error);
    toast.error(data.error);
  };
  useQueryWrapper(["verify-email"], url, onSuccess, onError, {
    enabled: !!url,
  });

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");
      if (token) {
        try {
          const url = `${authRequest.VERIFY_EMAIL}?token=${token}`;
          setUrl(url);
        } catch (error: any) {
          setMessage("Verification failed. Please try again.");
          toast.error("Verification failed. Please try again.");
        }
      } else {
        setMessage("Invalid verification link.");
        toast.error("Invalid verification link.");
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <Flex
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      width={{ base: "100%", md: "400px" }}
      textAlign="center"
      margin="auto"
      mt="10rem"
    >
      <Heading color="primary">Email Verification</Heading>
      <Box mt="5rem">
        <Text>{message}</Text>
      </Box>
      <Button
        mt="2rem"
        fontWeight="bold"
        fontSize="20px"
        padding="1rem 3rem"
        onClick={() => navigate(PUBLIC_PATHS.LOGIN)}
      >
        Go to Login
      </Button>
    </Flex>
  );
};

export default VerifyEmailResult;
