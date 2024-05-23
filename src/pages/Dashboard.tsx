import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { logoutUser } from "../redux/slices/authSlice";
import { Box, Flex, Heading, Text, Button, VStack } from "@chakra-ui/react";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  const jokes = [
    "Why don't developers play hide and seek? Because good luck hiding from bugs!",
    "Why do programmers prefer dark mode? Because light attracts bugs!",
    "Why do Java developers wear glasses? Because they don’t see sharp.",
    "How many programmers does it take to change a light bulb? None. It's a hardware problem.",
  ];

  const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.100" p={4}>
      <Box
        maxW="sm"
        w="full"
        bg="white"
        boxShadow="md"
        rounded="lg"
        p={6}
        textAlign="center"
      >
        <VStack spacing={4}>
          <Heading size="lg">Welcome to Knight's App</Heading>
          {user && <Text fontSize="lg">Hello, {user.username}!</Text>}
          <Text>{randomJoke}</Text>
          <Button colorScheme="teal" onClick={() => dispatch(logoutUser())}>
            Logout
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Dashboard;
