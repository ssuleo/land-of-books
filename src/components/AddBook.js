import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from 'axios';
import { getCookie } from "./Token";

function AddBook() {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [statuses, setStatuses] = useState([]);

  // Veritabanından kategori ve durum bilgilerini çekmek için useEffect kullanılıyor.
  useEffect(() => {
    const fetchCategoriesAndStatuses = async () => {
      setIsLoading(true);
      try {
        // API endpoint'inizi buraya yazın.
        const response = await axios.get(
          "http://localhost/land-of-books/backend/addBooks.php"
        );

        setCategories(Object.entries(response.data.categories));
        setStatuses(Object.entries(response.data.statuses));
        setIsLoading(false);
      } catch (error) {
        toast({
          title: "Bir hata oluştu!",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true
        });
        setIsLoading(false);
      }
    };

    fetchCategoriesAndStatuses();
  }, [toast]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
//input değerlerini toplar
    const formData = new FormData(event.target);

    console.log(formData);

    try {
      // PHP API endpoint'inizi buraya yazın.
      const response = await axios.post(
        "http://localhost/land-of-books/backend/addBooks.php?authToken=" +
          getCookie("authToken"),
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      toast({
        title: "Kitap eklendi.",
        description: response.data,
        status: "success",
        duration: 5000,
        isClosable: true
      });
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
    <Box w="100%" p={10} paddingTop="40px">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <Flex>
            <FormControl isRequired>
              <FormLabel htmlFor="bookName">Kitap Adı</FormLabel>
              <Input
                id="bookName"
                name="bookName"
                placeholder="Kitap adını giriniz"
              />
            </FormControl>
            <FormControl pl={1} isRequired>
              <FormLabel htmlFor="authorName">Yazar Adı</FormLabel>
              <Input
                id="authorName"
                name="authorName"
                placeholder="Yazar adını giriniz"
              />
            </FormControl>
          </Flex>
          <FormControl isRequired>
            <FormLabel htmlFor="publishYear">Yayın Yılı</FormLabel>
            <Input
              id="publishYear"
              name="publishYear"
              type="number"
              placeholder="Yayın yılını giriniz"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="category">Kitap Kategorisi</FormLabel>
            <Select
              id="category"
              name="category"
              placeholder="Kategori seçiniz"
            >
              {categories.map(([id, name]) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="condition">Kitap Durumu</FormLabel>
            <Select id="status" name="status" placeholder="Durum seçiniz">
              {statuses.map(([id, name]) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="point">Point</FormLabel>
            <Input
              id="point"
              name="point"
              type="number"
              placeholder="Puan giriniz"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="publisher">Yayın Evi</FormLabel>
            <Input id="publisher" name="publisher" placeholder="Yayın evi giriniz" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="description">Kısa Açıklama</FormLabel>
            <Textarea
              id="description"
              name="description"
              placeholder="Kitap hakkında kısa bir açıklama giriniz"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="bookImage">Kitap Kapak Resmi</FormLabel>
            <Input
              id="bookImage"
              name="bookImage"
              type="file"
              accept="image/*"
            />
          </FormControl>

          <Button
            type="submit"
            bgColor="#20304E"
            color="white"
            isLoading={isLoading}
          >
            Kitap Ekle
          </Button>
        </VStack>
      </form>
    </Box>
  );
}

export default AddBook;
