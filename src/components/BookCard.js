import { Box, Image, Text, Stack, Avatar, HStack, Badge } from '@chakra-ui/react';

const BookCard = ({ title, author, points, timestamp, coverImage, avatarImage }) => {
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" m={2}>
      <Image src="images/book.png" alt={`Cover image for ${title}`} />

      <Box p="6">
        <Stack spacing={1}>
          <Text fontWeight="bold" fontSize="lg" lineHeight="tight">
            {title}
          </Text>
          <HStack justify="space-between">
            <HStack>
              <Avatar size="xs" name={author} src={avatarImage} />
              <Text fontWeight="semibold" size="sm">{author}</Text>
            </HStack>
            <Badge>{points} points</Badge>
          </HStack>
          <Text color="gray.500" fontSize="sm">{timestamp}</Text>
        </Stack>
      </Box>
    </Box>
  );
};

export default BookCard;