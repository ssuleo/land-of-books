import React, { useEffect, useState } from "react";
import Offers from "../../components/Offers";
import AdminNavbar from "../../components/AdminNavbar";
import Footer from "../../components/Footer";
import NavigationBar from "../../components/NavigationBar";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
  useToast,
  Image,
  InputGroup,
  InputLeftElement,
  Checkbox
} from "@chakra-ui/react";
import { checkAuthAndRedirect } from "../../../utils/PrivateRouter";
import { useRouter } from "next/router";
import { getCookie } from "../../components/Token";
import axios from "axios";

export const getServerSideProps = async (ctx) => {
  return checkAuthAndRedirect(ctx);
};

const index = () => {
  const toast = useToast();

  const router = useRouter();

  // Query string parametrelerini al
  const query = router.query;
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [bookData, setBookData] = useState(null);

  console.log(query);

  const bookFetch = async () => {
    const response = await fetch(
      `http://localhost/land-of-books/backend/page/fetchBook.php?book=${
        query.book
      }&authToken=${getCookie("authToken")}`
    );
    const data = await response.json();
    console.log(data);
    if (!data) {
      router.push("/adminPanel");
    }
    setData(data);
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
    if (!query.book) {
      router.push("/adminPanel");
    }

    bookFetch();
    getBook();
  }, [query]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const formData = new FormData(e.target);
    formData.append("book", query.book);

    try {
      // PHP API endpoint'inizi buraya yazın.
      const response = await axios.post(
        "http://localhost/land-of-books/backend/page/add/addSwap.php?authToken=" +
          getCookie("authToken"),
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      if (response.data.status) {
        toast({
          title: "Kitap eklendi.",
          description: response.data.message,
          status: "success",
          duration: 5000,
          isClosable: true
        });

        router.push("/myOffers");
      } else {
        toast({
          title: "Kitap eklenemedi.",
          description: JSON.stringify(response.data),
          status: "error",
          duration: 5000,
          isClosable: true
        });
      }
    } catch (error) {
      toast({
        title: "Kitap eklenemedi.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AdminNavbar />
      <Box minH={"75vh"}>
        <Flex>
          <NavigationBar />
          {data && bookData ? (
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="stretch" p={10}>
                <Flex shadow={"md"}>
                  <Box p={5}>
                    <Image
                      src={
                        "http://localhost/land-of-books/backend/uploads/" +
                        data.book_image
                      }
                      alt={data.books_name}
                      borderRadius="md"
                      mb={2}
                      width="200px"
                    />
                  </Box>
                  <Box p={5}>
                    <Flex>
                      <FormControl ml="20px">
                        <FormLabel htmlFor="bookName">Kitap Adı</FormLabel>
                        {data.books_name}
                      </FormControl>
                      <FormControl ml="20px">
                        <FormLabel htmlFor="authorName">Yazar Adı</FormLabel>
                        {data.writer}
                      </FormControl>
                    </Flex>
                    <FormControl ml="20px">
                      <FormLabel htmlFor="publishYear">Yayın Yılı</FormLabel>
                      {data.publication_year}
                    </FormControl>
                  </Box>
                  <Box p={5}>
                    <FormControl isRequired ml="20px">
                      <FormLabel htmlFor="adress">Adresiniz</FormLabel>
                      <Textarea
                        id="adress"
                        name="adress"
                        w="600px"
                        placeholder="Kitapın gönderileceği adresi giriniz."
                      />
                    </FormControl>
                    <FormControl ml="20px">
                      <FormLabel
                        htmlFor="description"
                        whiteSpace="normal"
                        wordBreak="break-word"
                      >
                        Kısa Özeti
                      </FormLabel>
                      {data.description}
                    </FormControl>
                    <Button
                      mt={5}
                      type="submit"
                      bgColor="#20304E"
                      color="white"
                      isLoading={isLoading}
                    >
                      Teklif Ver
                    </Button>
                  </Box>
                </Flex>
              </VStack>
            </form>
          ) : null}
        </Flex>
      </Box>
      <Footer />
    </>
  );
};

export default index;
