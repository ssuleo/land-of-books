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
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";

export default function SignIn() {
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      direction={{ base: "column", md: "row" }}
      bg={useColorModeValue("gray.50", "gray.800")}
      p={5}
    >
      <Box
        w={{ base: "90%", md: "600px" }}
        h="400px"
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        p={8}
        mr={{ md: 6 }}
        mb={{ base: 6, md: 0 }}
      >
        <Heading as="h1" size="lg" align="center">
          BOOKSWAP
        </Heading>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            }, 1000);
          }}
        >
          {(props) => (
            <Form>
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
              <Button
                mt={4}
                w="full"
                colorScheme="blue"
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
