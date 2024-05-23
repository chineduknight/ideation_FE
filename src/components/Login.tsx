import {
  Flex,
  Box,
  Input,
  Heading,
  Checkbox,
  Text,
  Button,
  Image,
} from "@chakra-ui/react";

const AuthWrapper = () => {
  return (
    <Flex bg="red" minH="100vh">
      <Box bg="#fbfbfb" w="50%">
        <LoginForm />
      </Box>
      <Box bg="green" w="50%">
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

const RegisterForm = () => {
  return (
    <Flex
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      width="400px"
      textAlign="center"
      margin="auto"
    >
      <Heading mt="10rem" color="primary">
        Create Account
      </Heading>
      <Box mt="5rem">
        <Input mb="1rem" placeholder="Name" />
        <Input mb="1rem" placeholder="Email" />
        <Input mb="1rem" placeholder="Password" />
        <Flex>
          <Checkbox mr="1rem" />
          <Text>I agree to the</Text>
          <Text color="primary" ml="0.3rem">
            terms and conditions
          </Text>
        </Flex>
        <Button mt="1rem" fontWeight="bold" fontSize="20px" padding="1rem 3rem">
          Sign Up
        </Button>
      </Box>
      <Flex mt="2rem" justifyContent="center">
        <Text>Already have an account?</Text>
        <Button ml="0.2rem" variant="link" color="red">
          Sign In
        </Button>
      </Flex>
    </Flex>
  );
};

const LoginForm = () => {
  return (
    <Flex
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      width="400px"
      textAlign="center"
      margin="auto"
    >
      <Heading mt="10rem" color="primary">
        Login to your Account
      </Heading>
      <Box mt="5rem">
        <Input mb="1rem" placeholder="Email" />
        <Input mb="1rem" placeholder="Password" />
        <Button mt="1rem" fontWeight="bold" fontSize="20px" padding="1rem 3rem">
          Login
        </Button>
      </Box>
      <Flex mt="2rem" justifyContent="center">
        <Text>Dont have an account?</Text>
        <Button ml="0.2rem" variant="link" color="red">
          Sign Up
        </Button>
      </Flex>
    </Flex>
  );
};
