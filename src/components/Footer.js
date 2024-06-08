import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { FaInstagram, FaFacedevice, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <Box

      as="footer"
      width="full"
      py={5}
      borderTopWidth={1}
      borderColor="gray.200"
    >
      <Container maxWidth="container.xl">
        <Stack
          direction={{ base: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="center"
        >
          <HStack spacing={4}>
            <Link href="/contact">Contact Us</Link>
            <Text>|</Text>
            <Link href="/about">About deviceswap</Link>
            <Text>|</Text>
            <Link href="/terms">Terms & Conditions</Link>
            <Text>|</Text>
            <Link href="/privacy">Privacy Policy</Link>
          </HStack>
          <HStack spacing={4}>
            <Link href="https://instagram.com" isExternal>
              <Icon as={FaInstagram} />
            </Link>
            <Link href="https://facedevice.com" isExternal>
              <Icon as={FaFacedevice} />
            </Link>
            <Link href="https://tiktok.com" isExternal>
              <Icon as={FaTiktok} />
            </Link>
          </HStack>
          <Text>Copyright © 2023 deviceswap Ltd</Text>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
