import React, { useEffect, useState } from "react";
import NavigationBar from "../../components/NavigationBar";
import Footer from "../../components/Footer";
import { checkAuthAndRedirect } from "../../../utils/PrivateRouter";
import AdminNavbar from "../../components/AdminNavbar";
import {
  Flex,
  ChakraProvider,
  Box,
  Text,
  SimpleGrid,
  Card,
  Image
} from "@chakra-ui/react";
import axios from "axios";
import { getCookie } from "../../components/Token";
const AdminPanel = () => {
  const [userData, setUserData] = useState(null);
  const [bookData, setBookData] = useState(null);

  const getUser = async () => {
    const response = await axios.get(
      "http://localhost/land-of-books/backend/page/getUser.php?authToken=" +
        getCookie("authToken")
    );
    setUserData(response.data);
  };

  const getBook = async () => {
    const response = await axios.get(
      "http://localhost/land-of-books/backend/page/getBook.php?authToken=" +
        getCookie("authToken")
    );
    setBookData(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    getUser();
    getBook();
  }, []);

  return (
    <>
      <AdminNavbar />

      {userData && bookData ? (
        <ChakraProvider>
          <Flex minH={"75vh"} flexDirection={{ base: "column", md: "row" }}>
            {/* NavigationBar bölümü */}
            <Box width="20%">
              <NavigationBar />
            </Box>

            {/* Ana sayfa içeriği */}
            <Box width="70%" p={4}>
              {/* Hoşgeldin ve puan bölümü */}
              <Box display="flex" justifyContent="space-between" mb={4} gap={5}>
                {/* Hoşgeldin bölümü */}
                <Text
                  fontSize="xl"
                  boxShadow="md"
                  width="80%"
                  borderRadius="md"
                  p={4}
                >
                  Hoşgeldin, {userData.users_name}!
                </Text>

                {/* Puan bölümü */}
                <Text fontSize="xl" boxShadow="md" borderRadius="md" p={4}>
                  Puanın: {userData.point ? userData.point : 0}
                </Text>
              </Box>

              {/* Kitaplar bölümü */}
              <Box>
                <Text fontSize="xl" mb={2}>
                  Kitapların
                </Text>
                {/* Yan yana 3 kitap kartı */}
                <SimpleGrid
                  columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
                  spacing={4}
                >
                  {bookData.map((book) => (
                    <Card
                      key={book.idbooks}
                      boxShadow="md"
                      borderRadius="md"
                      p={4}
                    >
                      <Image
                        src={
                          "http://localhost/land-of-books/backend/uploads/" +
                          book.book_image
                        }
                        alt={book.books_name}
                        borderRadius="md"
                        mb={2}
                      />
                      <Text fontWeight="bold">{book.books_name}</Text>
                      <Text>{book.publisher}</Text>
                      <Text>Puan: {book.point}</Text>
                    </Card>
                  ))}
                </SimpleGrid>
              </Box>
            </Box>
          </Flex>
        </ChakraProvider>
      ) : null}

      <Footer />
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  return checkAuthAndRedirect(ctx);
};

export default AdminPanel;
