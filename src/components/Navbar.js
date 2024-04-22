import React from "react";
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useColorModeValue,
  Image,
  IconButton,
} from "@chakra-ui/react";
import { BellIcon, ChatIcon, SearchIcon, SettingsIcon, ShoppingCartIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { useNavbar } from '../context/NavbarContext';

const Navbar = () => {
  const { user, logout } = useNavbar(); 
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/login");
  };

  const handleSignUpClick = () => {
    router.push("/signUp");
  };

  return (
    <Box bg={bgColor} px={6} py={2} boxShadow="sm">
      <Flex justifyContent="space-between" alignItems="center">
        <Image src={"images/logoiki.png"} w="150px" h={user ? "50px" : "100px"} alt="BookSwap Logo" />
        <InputGroup w="800px">
          <InputRightElement
            pointerEvents="none"
            children={<SearchIcon color="gray.500" />}
          />
          <Input placeholder={user ? "Kitapları, yazarları, yayıncıları veya üyeleri arayın..." : "Title, author, keyword, ISBN, user"} />
        </InputGroup>
        {user ? (
          <Flex>
            <IconButton
              
              variant="ghost"
              aria-label="Shopping Cart"
            />
            <IconButton
            
              variant="ghost"
              aria-label="Messages"
            />
            <IconButton
              
              variant="ghost"
              aria-label="Notifications"
            />
            <IconButton
              
              variant="ghost"
              aria-label="Settings"
            />
          </Flex>
        ) : (
          <Flex>
            <Button bgColor="#20304E" color="white" onClick={handleLoginClick}>
              Log in
            </Button>
            <Button bgColor="#20304E" color="white" ml="10px" onClick={handleSignUpClick}>
              Sign Up
            </Button>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;