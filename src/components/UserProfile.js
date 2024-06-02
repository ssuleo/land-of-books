import {
    Box,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Button,
    Heading,
    Switch,
    Text,
    VStack,
    HStack,
    Select
  } from '@chakra-ui/react';
  
  const UserProfile = () => {
    return (
      <Box p={10}>
        <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" gap={10}>
          <Box flex="1" bg="white" p={5} boxShadow="sm" borderRadius="md">
            <Heading size="md" mb={4} textAlign="center">Kullanıcı Bilgilerim</Heading>
            <VStack spacing={4} mt="10">
              <FormControl id="first-name">
                <FormLabel>Ad</FormLabel>
                <Input placeholder="Adınız" />
              </FormControl>
              <FormControl id="last-name">
                <FormLabel>Soyad</FormLabel>
                <Input placeholder="Soyadınız" />
              </FormControl>
              <FormControl id="email">
                <FormLabel>E-Mail</FormLabel>
                <Input placeholder="E-posta adresiniz" />
              </FormControl>
              <FormControl id="phone">
                <FormLabel>Cep Telefonu</FormLabel>
                <Input placeholder="Telefon numaranız" />
              </FormControl>
              <Button bg="#20304E" color="white">Güncelle</Button>
            </VStack>
          </Box>
  
          <Box flex="1" bg="white" p={5} boxShadow="sm" borderRadius="md">
            <Heading size="md" mb={4} textAlign="center">Şifre Güncelleme</Heading>
            <VStack spacing={4} mt="10">
              <FormControl id="current-password">
                <FormLabel>Şu Anki Şifre</FormLabel>
                <Input type="password" placeholder="Mevcut şifreniz" />
              </FormControl>
              <FormControl id="new-password">
                <FormLabel>Yeni Şifre</FormLabel>
                <Input type="password" placeholder="Yeni şifreniz" />
              </FormControl>
              <FormControl id="confirm-password">
                <FormLabel>Yeni Şifre (Tekrar)</FormLabel>
                <Input type="password" placeholder="Yeni şifrenizi tekrar girin" />
              </FormControl>
              <Button bg="#20304E" color="white">Güncelle</Button>
            </VStack>
          </Box>
        </Flex>
      </Box>
    );
  };
  
  export default UserProfile;