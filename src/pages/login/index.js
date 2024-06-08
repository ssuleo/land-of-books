import React from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Button,
  Heading,
  Image,
  useColorModeValue,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { useRouter } from "next/router";
import axios from "axios";
import { setCookie } from "../../components/Token";

export default function SignIn() {
  const router = useRouter();
  const toast = useToast();

  const handleSignUpClick = () => {
    router.push("/register");
  };

  const handleSubmit = async (values, actions) => {
    const { users_name, email, password } = values;

    try {
      const response = await axios({
        method: "post",
        url: "http://localhost/land-of-devices/backend/login.php",
        data: {
          users_name,
          email,
          password
        },
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = response.data;
      console.log(data)
      if (response.data.message === "Success") {
        setCookie("authToken", response.data.token);
        console.log(setCookie("authToken", response.data.token));
        router.push("/adminPanel");
      } else {
        toast({
          title: "An error occurred.",
          description: data.error || "An unknown error occurred.",
          status: "error",
          duration: 9000,
          isClosable: true
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast({
        title: "An error occurred.",
        description:
          error.response && error.response.data.error
            ? error.response.data.error
            : "Network error, please try again.",
        status: "error",
        duration: 9000,
        isClosable: true
      });
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      direction={{ base: "column", md: "row" }}
      bg={useColorModeValue("gray.50", "gray.800")}
      p={5}
    >
      <Box
        w={{ base: "90%", md: "600px" }}
        h="550px"
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        p={8}
        mr={{ md: 6 }}
        mb={{ base: 6, md: 0 }}
      >
        <Flex justifyContent="center">
          <Image src="images/logoiki.png" w="150px" h="80px"></Image>
        </Flex>

        <Formik
          initialValues={{ email: "", password: "", users_name: "" }}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <Form>
              <Field name="users_name">
                {({ field }) => (
                  <FormControl id="users_name" mt={4}>
                    <FormLabel>User Name</FormLabel>
                    <Input {...field} type="text" />
                  </FormControl>
                )}
              </Field>
              <Field name="email">
                {({ field }) => (
                  <FormControl id="email" mt={4}>
                    <FormLabel>Email address</FormLabel>
                    <Input {...field} type="email" />
                  </FormControl>
                )}
              </Field>
              <Field name="password">
                {({ field }) => (
                  <FormControl id="password" mt={4}>
                    <FormLabel>Password</FormLabel>
                    <Input {...field} type="password" />
                  </FormControl>
                )}
              </Field>
              <Flex mt="10px">
                <Text>Not a member?</Text>
                <Button
                  variant="link"
                  colorScheme="blue"
                  ml="10px"
                  onClick={handleSignUpClick}
                >
                  Sign Up
                </Button>
              </Flex>

              <Button
                mt={4}
                w="full"
                bgColor="#29304E"
                color="white"
                isLoading={props.isSubmitting}
                type="submit"
              >
                Sign in
              </Button>
              <Flex mt={4} align="center" justify="space-between">
                <Checkbox>Remember me</Checkbox>
                <Button variant="link" colorScheme="blue">
                  Forgot password?
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
}
