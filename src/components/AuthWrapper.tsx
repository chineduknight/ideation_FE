import React from "react";
import { Flex, Box, Image } from "@chakra-ui/react";
import AuthForm from "./AuthForm"; // Adjust the import path as necessary

interface AuthWrapperProps {
  type: "login" | "register";
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ type }) => {
  return (
    <Flex minH="100vh">
      <Box bg="#fbfbfb" w={{ base: "100%", md: "50%" }}>
        <AuthForm type={type} />
      </Box>
      <Box bg="green" w="50%" display={{ base: "none", md: "block" }}>
        <Image
          w="100%"
          h="100vh"
          objectFit="cover"
          src="sideimg.jpg"
          alt="Main Logo"
        />
      </Box>
    </Flex>
  );
};

export default AuthWrapper;
