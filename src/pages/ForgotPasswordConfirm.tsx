import React from "react";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { PUBLIC_PATHS } from "routes/pagePath";

const ForgotPasswordConfirm: React.FC = () => {
  const navigate = useNavigate();

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
        Check Your Email
      </Heading>
      <Box mt="5rem">
        <Text mb="1rem">
          We have sent a password reset link to your email. Please check your
          email and follow the instructions to reset your password.
        </Text>
        <Button
          mt="1rem"
          fontWeight="bold"
          fontSize="20px"
          padding="1rem 3rem"
          onClick={() => navigate(PUBLIC_PATHS.LOGIN)}
        >
          Go to Login
        </Button>
      </Box>
    </Flex>
  );
};

export default ForgotPasswordConfirm;
