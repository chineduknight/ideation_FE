import React from "react";
import { Box, Flex, Heading, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { PUBLIC_PATHS } from "routes/pagePath";

const RegisterSuccessful: React.FC = () => {
  const navigate = useNavigate();

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
      <Heading color="primary">Check Your Email</Heading>
      <Box mt="5rem">
        <Text>
          We have sent a verification email to your email address. Please check
          your email and click on the verification link to verify your account.
        </Text>
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

export default RegisterSuccessful;
