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
  const [deviceData, setdeviceData] = useState(null);

  console.log(query);

  const deviceFetch = async () => {
    const response = await fetch(
      `http://localhost/land-of-devices/backend/page/fetchdevice.php?device=${
        query.device
      }&authToken=${getCookie("authToken")}`
    );
    const data = await response.json();
    console.log(data);
    if (!data) {
      router.push("/adminPanel");
    }
    setData(data);
  };

  const getdevice = async () => {
    const response = await axios.get(
      "http://localhost/land-of-devices/backend/page/getdevice.php?authToken=" +
        getCookie("authToken")
    );
    setdeviceData(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    if (!query.device) {
      router.push("/adminPanel");
    }

    deviceFetch();
    getdevice();
  }, [query]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const formData = new FormData(e.target);
    formData.append("device", query.device);

    try {
      // PHP API endpoint'inizi buraya yazın.
      const response = await axios.post(
        "http://localhost/land-of-devices/backend/page/add/addSwap.php?authToken=" +
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
          title: "Cihaz eklendi.",
          description: response.data.message,
          status: "success",
          duration: 5000,
          isClosable: true
        });

        router.push("/myOffers");
      } else {
        toast({
          title: "Cihaz eklenemedi.",
          description: JSON.stringify(response.data),
          status: "error",
          duration: 5000,
          isClosable: true
        });
      }
    } catch (error) {
      toast({
        title: "Cihaz eklenemedi.",
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
          {data && deviceData ? (
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="stretch" p={10}>
                <Flex shadow={"md"}>
                  <Box p={5}>
                    <Image
                      src={
                        "http://localhost/land-of-devices/backend/uploads/" +
                        data.device_image
                      }
                      alt={data.devices_name}
                      borderRadius="md"
                      mb={2}
                      width="200px"
                    />
                  </Box>
                  <Box p={5}>
                    <Flex>
                      <FormControl ml="20px">
                        <FormLabel htmlFor="deviceName">Cihaz Adı</FormLabel>
                        {data.devices_name}
                      </FormControl>
                      <FormControl ml="20px">
                        <FormLabel htmlFor="authorName">Yazar Adı</FormLabel>
                        {data.model}
                      </FormControl>
                    </Flex>
                    <FormControl ml="20px">
                      <FormLabel htmlFor="publishYear">Yayın Yılı</FormLabel>
                      {data.year}
                    </FormControl>
                  </Box>
                  <Box p={5}>
                    <FormControl isRequired ml="20px">
                      <FormLabel htmlFor="adress">Adresiniz</FormLabel>
                      <Textarea
                        id="adress"
                        name="adress"
                        w="600px"
                        placeholder="Cihazın gönderileceği adresi giriniz."
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
