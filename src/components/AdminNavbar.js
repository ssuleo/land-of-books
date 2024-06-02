import {
  Box,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Image,
  Text,
  Button,
  Center
} from "@chakra-ui/react";
import React, { useState } from "react";
import { IoMdNotifications } from "react-icons/io";
import { removeCookie } from "./Token";
import { useRouter } from "next/router";
import { FaUserCircle } from "react-icons/fa";
import { userFeatures } from "../../utils/const";

const AdminNavbar = () => {
  const router = useRouter();
  const handleMenuItemClick = (path) => {
    if (path === "logout") {
      removeCookie("authToken");
      router.push("/");
    } else if (path === "settings") {
      router.push("/settings");
    }
  };

  const [searchInput, setSearchInput] = useState('')

  const searchSubmit = (e) => {
    e.preventDefault();
    router.push(`/search/?s=${searchInput}`)
  }

  return (
    <Box bg="gray.100" px={6} py={2} boxShadow="sm">
      <Flex justifyContent="space-between" alignItems="center" flexDirection={{ base: "column", md: "row" }}>
        <Image
          src={"images/logoiki.png"}
          w="150px"
          h="100px"
          alt="BookSwap Logo"
          cursor="pointer"
          onClick={() => router.push("/adminPanel")}
        />
        <Center >
          <Center>
            <InputGroup w={"100%"}>
              <form onSubmit={searchSubmit}>
                <InputRightElement pointerEvents="none" />
                <Input placeholder="Title, author, keyword, ISBN, user" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
              </form>
            </InputGroup>
          </Center>

        </Center>

        <Flex >
          <Flex alignItems="center">
            <Menu>
              <MenuButton
                as={Button}
                leftIcon={<IoMdNotifications size="20px" color="#20304E" />}
                variant="ghost"
                mr="4"
              >
                Bildirimler
              </MenuButton>
            </Menu>
          </Flex>

          <Menu>
            <MenuButton
              as={Button}
              leftIcon={<FaUserCircle size="20px" color="#20304E" />}
              variant="ghost"
              mr="4"
            >
              Hesabım
            </MenuButton>

            <MenuList>
              {userFeatures.map((item, index) => (
                <MenuItem
                  key={index}
                  onClick={() => handleMenuItemClick(item.path)}
                >
                  {item.info}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};

export default AdminNavbar;
