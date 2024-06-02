import {
  Box,
  Image,
  Text,
  Stack,
  Avatar,
  HStack,
  Badge
} from "@chakra-ui/react";

const BookCard = ({
  title,
  author,
  points,
  timestamp,
  avatarImage,
  bookImage,
  publisher
}) => {
  return (
    <>
      <Box
        maxW="sm"
        w="300px"
        h="400px"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        m={2}
      >
        <Image
          src={"http://localhost/land-of-books/backend/uploads/" + bookImage}
          alt={`Cover image for ${title}`}
          w="100%"
          h="60%"
          objectFit="contain"
          objectPosition="center"
        />
        <Box p="6">
          <Stack spacing={1}>
            <Text fontWeight="bold" fontSize="lg" lineHeight="tight">
              {title}
            </Text>
            <HStack justify="space-between">
              <HStack>
                <Avatar size="xs" name={author} src={avatarImage} />
                <Text fontWeight="semibold" size="sm">
                  {author}
                </Text>
              </HStack>
              <Badge>{points} points</Badge>
              
            </HStack>
            <Badge>{publisher} </Badge>
            <Text color="gray.500" fontSize="sm">
              {timestamp}
            </Text>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default BookCard;
