import { Box, Heading, Text, VStack, Flex, Tag, Image } from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";

const offers = [
  {
    id: 1,
    offeredBy: "Şule Öztürk",
    offeredBook: {
      title: "Harry Potter",
      author: "J.K. Rowling",
      points: 5,
      image: "images/harrypotter.png",
    },
    offeredTo: "Gözde Baş",
    requestedBook: {
      title: "Aynı Yıldızın Altında",
      author: "John Green",
      points: 4,
      image: "images/harrypotter.png    ",
    },
  },
];

function Offers() {
  return (
    <Box p={5} w="1000px" ml="150px" paddingTop="40px">
      {offers.map((offer) => (
        <Box
          key={offer.id}
          p={5}
          shadow="md"
          borderWidth="1px"
          borderRadius="md"
        >
          <VStack align="stretch" spacing={4}>
            <Flex justify="space-around" align="center">
              <VStack align="center">
                <Image
                  boxSize="80px"
                  src={offer.offeredBook.image}
                  alt={`Cover of ${offer.offeredBook.title}`}
                />

                <Text fontWeight="bold">Teklif Eden: {offer.offeredBy}</Text>

                <Text>{offer.offeredBook.title}</Text>
                <Text>{offer.offeredBook.author}</Text>
                <Tag colorScheme="green" size="lg">
                  Puan: {offer.offeredBook.points}
                </Tag>
              </VStack>
              <Box p={5}>
                <FaArrowRight size="2em" />
              </Box>

              <VStack align="center">
                <Image
                  boxSize="80px"
                  src={offer.requestedBook.image}
                  alt={`Cover of ${offer.requestedBook.title}`}
                />
                <Text fontWeight="bold">Teklif Alıcı: {offer.offeredTo}</Text>

                <Text>{offer.requestedBook.title}</Text>
                <Text>{offer.requestedBook.author}</Text>
                <Tag colorScheme="red" size="lg">
                  Puan: {offer.requestedBook.points}
                </Tag>
              </VStack>
            </Flex>
          </VStack>
        </Box>
      ))}
    </Box>
  );
}

export default Offers;
