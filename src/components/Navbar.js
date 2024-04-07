import React from "react";
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useColorModeValue,
  Heading,
  Image
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

const Navbar = () => {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const color = useColorModeValue("blue.600", "blue.200");
  const router = useRouter();
  const handleLoginClick = () => {
    router.push("/login");
  };

  return (
    <Box bg={bgColor} px={6} py={2} boxShadow="sm">
      <Flex justifyContent="space-between" alignItems="center">
<Image src="images/logo2.png" w="150px" h="100px"></Image>
        <InputGroup w="800px">
          <InputRightElement
            pointerEvents="none"
            children={<Search2Icon color="gray.500" />}
          />
          <Input placeholder="Title, author, keyword, ISBN, user" />
        </InputGroup>
        <Button colorScheme="blue" onClick={handleLoginClick}>
          Log in
        </Button>
      </Flex>
    </Box>
  );
};

export default Navbar;