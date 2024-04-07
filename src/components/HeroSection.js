import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Image,
  Stack,
  Center,
} from "@chakra-ui/react";

const HeroSection = () => {
  return (
    <Center minHeight="100vh">
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="center"
        p={10}
      >
        <Box
          p={5}
          flex={{ base: "none", md: "1" }}
          textAlign={{ base: "center", md: "left" }}
        >
          <Heading mb={4} fontSize={{ base: "4xl", md: "5xl", lg: "5xl" }}>
            You are in the right place to exchange the books you want to read{" "}
          </Heading>
          <Text fontSize={{ base: "md", lg: "lg" }} color="gray.600" mb={8}>
            You can get that book by exchanging the books you have with the
            books you want to read !
          </Text>
          <Button size="lg" colorScheme="teal" borderRadius="md">
            Get Started
          </Button>
        </Box>
        <Box p={5} flex={{ base: "none", md: "1" }} textAlign="center">
          <Image
            src="images/book.png"
            alt="Woman holding books"
            w="800px"
            h="500px"
            objectFit="cover"
            borderRadius="lg"
          />
        </Box>
      </Flex>
    </Center>
  );
};

export default HeroSection;
