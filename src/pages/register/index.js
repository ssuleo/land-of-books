import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  useColorModeValue,
  useToast
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useRouter } from "next/router";
export default function SignUp() {
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = async (values, actions) => {
    const { users_name, email, password ,phone_number} = values; 

    try {
      const response = await axios({
        method: 'post',
        url: "http://localhost/land-of-devices/backend/register.php",
        data: {
          users_name,
          email,
          password,
          phone_number
        },
        headers: {
          "Content-Type": "application/json", 
        },
      });
      const data = response.data;
      console.log(data)
      if (data.message === "User successfully registered.") {
        toast({
          title: "Başarılı",
          description: "Kullanıcı başarıyla kaydedildi.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        router.push("/login");
      } else {
        toast({
          title: "Hata",
          description:data.error,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Bir hata oluştu",
        description: error.data?.error || "Sunucuya bağlanılamıyor.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      actions.setSubmitting(false);
    }
  };
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
        h="600px"
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
          initialValues={{ email: "", password: "", users_name: "" ,phone_number:""}}
         onSubmit={handleSubmit}
        >
          {(props) => (
            <Form>
              <Field name="users_name">
                {({ field }) => (
                  <FormControl id="users_name" mt={4}>
                    <FormLabel>User Name</FormLabel>
                    <Input {...field} type="users_name" />
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
              <Field name="phone_number">
                {({ field }) => (
                  <FormControl id="phone_number" mt={4}>
                    <FormLabel>Cep Telefonu</FormLabel>
                    <Input {...field} type="phone_number" />
                  </FormControl>
                )}
              </Field>

              <Button
                mt={4}
                w="full"
                bgColor="#29304E"
                color="white"
                isLoading={props.isSubmitting}
                type="submit"
              >
                Sign Up
              </Button>
              <Button
                mt={4}
                w="full"
                leftIcon={<FcGoogle />}
                variant="outline"
                colorScheme="gray"
                onClick={() => {
                  alert("Google ile giriş yap işlemi henüz desteklenmiyor.");
                }}
              >
                Google ile Kayıt Ol
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
}
