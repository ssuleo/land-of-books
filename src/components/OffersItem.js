import {
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Heading,
  Text,
  VStack,
  Flex,
  Tag,
  Image,
  Box,
  Input,
  FormLabel,
  FormControl,
  Textarea,
  Button,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Select
} from "@chakra-ui/react";
import axios from "axios";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { getCookie } from "./Token";
import { useEffect, useState } from "react";

function OffersItem({ initialOffer, userId }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [offer, setOffer] = useState(initialOffer);

  const toast = useToast();
  console.log(initialOffer);

  const handelCargoStatus = async (type) => {
    try {
      // PHP API endpoint'inizi buraya yazın.
      const response = await axios.post(
        "http://localhost/land-of-devices/backend/page/update/upCargoStatus.php?type=" +
          type +
          "&authToken=" +
          getCookie("authToken") +
          `&offersId=${offer.idoffers}`
      );
      if (response.data.status) {
        toast({
          title: "Kaydedildi.",
          description: response.data.message,
          status: "success",
          duration: 5000,
          isClosable: true
        });

        setOffer((prevOffer) => ({
          ...prevOffer,
          senderCargoStatus: 1,
          userCargoStatus: 1
        }));

        onClose();
      } else {
        toast({
          title: "HATA.",
          description: JSON.stringify(response.data),
          status: "error",
          duration: 5000,
          isClosable: true
        });
        onClose();
      }
    } catch (error) {
      toast({
        title: "Takas güncellenemedi.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true
      });
    } finally {
    }
  };

  const handelModalSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    try {
      // PHP API endpoint'inizi buraya yazın.
      const response = await axios.post(
        "http://localhost/land-of-devices/backend/page/update/upCargo.php?authToken=" +
          getCookie("authToken") +
          `&offersId=${offer.idoffers}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      if (response.data.status) {
        toast({
          title: "Kaydedildi.",
          description: response.data.message,
          status: "success",
          duration: 5000,
          isClosable: true
        });
        setOffer((prevOffer) => ({
          ...prevOffer,
          senderCargo: 1,
          userCargo: 1
        }));

        onClose();
      } else {
        toast({
          title: "HATA.",
          description: JSON.stringify(response.data),
          status: "error",
          duration: 5000,
          isClosable: true
        });
        onClose();
      }
    } catch (error) {
      toast({
        title: "Takas güncellenemedi.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true
      });
    } finally {
    }
  };
  const handelCloseOffers = async () => {
    try {
      // PHP API endpoint'inizi buraya yazın.
      const response = await axios.post(
        "http://localhost/land-of-devices/backend/page/update/upOffersCancel.php?authToken=" +
          getCookie("authToken") +
          `&offersId=${offer.idoffers}`
      );
      if (response.data.status) {
        toast({
          title: "Başarılı bir şekilde reddedildi.",
          description: response.data.message,
          status: "success",
          duration: 5000,
          isClosable: true
        });
        setOffer((prevOffer) => ({
          ...prevOffer,
          status: 2
        }));
      } else {
        toast({
          title: "HATA.",
          description: JSON.stringify(response.data),
          status: "error",
          duration: 5000,
          isClosable: true
        });
      }
    } catch (error) {
      toast({
        title: "Takas güncellenemedi.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true
      });
    } finally {
    }
  };
  const handelSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    try {
      // PHP API endpoint'inizi buraya yazın.
      const response = await axios.post(
        "http://localhost/land-of-devices/backend/page/update/upOffersAccept.php?authToken=" +
          getCookie("authToken") +
          `&offersId=${offer.idoffers}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      if (response.data.status) {
        toast({
          title: "Güncellendi.",
          description: response.data.message,
          status: "success",
          duration: 5000,
          isClosable: true
        });
        setOffer((prevOffer) => ({
          ...prevOffer,
          status: 1,
          userAdress: "1"
        }));
      } else {
        toast({
          title: "HATA.",
          description: JSON.stringify(response.data),
          status: "error",
          duration: 5000,
          isClosable: true
        });
      }
    } catch (error) {
      toast({
        title: "Takas güncellenemedi.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true
      });
    } finally {
    }
  };

  if (userId == offer.idsenders) {
    return (
      <>
        <Modal onClose={onClose} isOpen={isOpen} scrollBehavior={"inside"}>
          <ModalOverlay />
          <ModalContent>
            <form onSubmit={handelModalSubmit}>
              <Input type="hidden" name="type" value={"sender"} />
              <ModalHeader>Kargo bilgilerini giriniz</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Select mb={5} name="firma" isRequired>
                  <option value="1">Aras Kargo</option>
                  <option value="2">Yurtiçi Kargo</option>
                  <option value="3">MNG Kargo</option>
                  <option value="4">Sürat Kargo</option>
                </Select>

                <Input
                  isRequired
                  name="kargoNo"
                  placeholder="Kargo No"
                  type="text"
                />
              </ModalBody>
              <ModalFooter>
                <Button type="submit" mr={5}>
                  Kaydet
                </Button>
                <Button onClick={onClose}>İptal</Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>

        <AccordionItem shadow="md">
          <AccordionButton>
            <Box p={5} borderRadius="md">
              <VStack align="stretch" spacing={4}>
                <Flex justify="space-around" align="center">
                  <VStack align="center">
                    <Image
                      boxSize="80px"
                      src={
                        "http://localhost/land-of-devices/backend/uploads/" +
                        offer.senderdevice_image
                      }
                      alt={`Cover of ${offer.senderdevice_name}`}
                    />

                    <Text fontWeight="bold">
                      Teklif Eden: {offer.sender_name}
                    </Text>

                    <Text>{offer.senderdevice_name}</Text>
                    <Text>{offer.senderdevice_author}</Text>
                    <Tag colorScheme="green" size="lg">
                      Puan: {offer.senderdevice_point}
                    </Tag>
                  </VStack>
                  <Box p={5}>
                    <FaArrowRightArrowLeft size="2em" />
                  </Box>

                  <VStack align="center">
                    <Image
                      boxSize="80px"
                      src={
                        "http://localhost/land-of-devices/backend/uploads/" +
                        offer.userdevice_image
                      }
                      alt={`Cover of ${offer.userdevice_name}`}
                    />
                    <Text fontWeight="bold">
                      Teklif Alıcı: {offer.user_name}
                    </Text>

                    <Text>{offer.userdevice_name}</Text>
                    <Text>{offer.userdevice_author}</Text>
                    <Tag colorScheme="red" size="lg">
                      Puan: {offer.userdevice_point}
                    </Tag>
                  </VStack>
                </Flex>
              </VStack>
            </Box>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel pb={4}>
            Durum:{" "}
            {offer.status == 0 ? (
              "Beklemede"
            ) : offer.status == 1 ? (
              <>
                <p>Onaylandı</p>
              </>
            ) : (
              "Reddedildi"
            )}
            {offer.status == 1 ? (
              <>
                <br />
                Gönderilecek Adres: {offer.userAdress}
              </>
            ) : null}
            {offer.userAdress && offer.senderAdress ? (
              <>
                {offer.senderCargo == null ? (
                  <>
                    <br />
                    <Button
                      type="submit"
                      bgColor="#20304E"
                      color="white"
                      onClick={onOpen}
                    >
                      Kargo Gönder
                    </Button>
                  </>
                ) : null}

                {offer.userCargoStatus == 0 ? (
                  <>
                    <br /> <br />
                    <Tag colorScheme="green" size="lg">
                      Karşı taraf kargoya verdi (Kargo No: {offer.userCargoNo})
                    </Tag>
                  </>
                ) : null}

                {offer.senderCargoStatus == 1 ? (
                  <>
                    <br /> <br />
                    <Tag colorScheme="green" size="lg">
                      Karşı taraf kargoyu teslim aldı (Kargo No:{" "}
                      {offer.senderCargoNo})
                    </Tag>
                  </>
                ) : offer.senderCargoStatus == 0 ? (
                  <>
                    <br />
                    <Tag colorScheme="green" size="lg">
                      Kargo Gönderildi
                    </Tag>
                  </>
                ) : null}

                {offer.userCargoStatus == 1 ? (
                  <div>
                    <Tag colorScheme="green" size="lg" mt={5}>
                      Teslim Alındı
                    </Tag>
                  </div>
                ) : offer.userCargoStatus == 0 ? (
                  <div>
                    <Button
                      mt={5}
                      bgColor="#20304E"
                      colorScheme="blue"
                      onClick={() => handelCargoStatus("sender")}
                    >
                      Teslim Aldım
                    </Button>
                  </div>
                ) : null}
              </>
            ) : null}
          </AccordionPanel>
        </AccordionItem>
      </>
    );
  } else {
    // bu kısımda karşı taraftan gelen teklifleri işliyoruz

    const [datadevice, setDatadevice] = useState(null);
    const getUserdevices = async () => {
      let data = await axios.get(
        "http://localhost/land-of-devices/backend/page/get/getUserdevice.php?userId=" +
          offer.idsenders
      );
      console.log(data.data.data);
      setDatadevice(data.data.data);
    };
    useEffect(() => {
      getUserdevices();
    }, []);

    const handelSetdevice = async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);

      try {
        // PHP API endpoint'inizi buraya yazın.
        const response = await axios.post(
          "http://localhost/land-of-devices/backend/page/update/upOfferdevice.php?offerId=" +
            offer.idoffers,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        );
        setOffer((prevOffer) => ({
          ...prevOffer,
          iddevices: 1
        }));
        toast({
          title: "Kitap eklendi.",
          description: response.data.message,
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
      }
    };

    return (
      <>
        <Modal onClose={onClose} isOpen={isOpen} scrollBehavior={"inside"}>
          <ModalOverlay />
          <ModalContent>
            <form onSubmit={handelModalSubmit}>
              <Input type="hidden" name="type" value={"user"} />
              <ModalHeader>Kargo bilgilerini giriniz</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Select mb={5} name="firma" isRequired>
                  <option value="1">Aras Kargo</option>
                  <option value="2">Yurtiçi Kargo</option>
                  <option value="3">MNG Kargo</option>
                  <option value="4">Sürat Kargo</option>
                </Select>

                <Input
                  isRequired
                  name="kargoNo"
                  placeholder="Kargo No"
                  type="text"
                />
              </ModalBody>
              <ModalFooter>
                <Button type="submit" mr={5}>
                  Kaydet
                </Button>
                <Button onClick={onClose}>İptal</Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
        <AccordionItem shadow="md">
          <h2>
            <AccordionButton>
              <Box p={5} borderRadius="md">
                <VStack align="stretch" spacing={4}>
                  <Flex justify="space-around" align="center">
                    <VStack align="center">
                      <Image
                        boxSize="80px"
                        src={
                          "http://localhost/land-of-devices/backend/uploads/" +
                          offer.senderdevice_image
                        }
                        alt={`Cover of ${offer.senderdevice_name}`}
                      />

                      <Text fontWeight="bold">
                        Teklif Eden: {offer.sender_name}
                      </Text>

                      <Text>{offer.senderdevice_name}</Text>
                      <Text>{offer.senderdevice_author}</Text>
                      <Tag colorScheme="green" size="lg">
                        Puan: {offer.senderdevice_point}
                      </Tag>
                    </VStack>
                    <Box p={5}>
                      <FaArrowRightArrowLeft size="2em" />
                    </Box>

                    <VStack align="center">
                      <Image
                        boxSize="80px"
                        src={
                          "http://localhost/land-of-devices/backend/uploads/" +
                          offer.userdevice_image
                        }
                        alt={`Cover of ${offer.userdevice_name}`}
                      />
                      <Text fontWeight="bold">
                        Teklif Alıcı: {offer.user_name}
                      </Text>

                      <Text>{offer.userdevice_name}</Text>
                      <Text>{offer.userdevice_author}</Text>
                      <Tag colorScheme="red" size="lg">
                        Puan: {offer.userdevice_point}
                      </Tag>
                    </VStack>
                  </Flex>
                </VStack>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {offer.status == 0 ? (
              <>
                {offer.iddevices == null ? (
                  <>
                    <form onSubmit={handelSetdevice}>
                      Lütfen kitap seçiniz
                      <Select mb={5} name="selectdevice" isRequired>
                        <option value="">Kitap Seçiniz</option>
                        {datadevice &&
                          datadevice.map((item) => (
                            <option value={item.iddevices}>
                              {item.devices_name}
                            </option>
                          ))}
                      </Select>
                      <Button
                        type="submit"
                        bgColor="#20304E"
                        color="white"
                        mx={5}
                      >
                        Onayla
                      </Button>
                      <Button
                        onClick={handelCloseOffers}
                        bgColor="#20304E"
                        color="white"
                      >
                        Reddet
                      </Button>
                    </form>
                  </>
                ) : (
                  <form onSubmit={handelSubmit}>
                    <VStack spacing={4} align="stretch">
                      <FormControl ml="20px" isRequired>
                        <FormLabel htmlFor="adress">Adresiniz</FormLabel>
                        <Textarea
                          id="adress"
                          name="adress"
                          placeholder="Adresinizi giriniz"
                        />
                      </FormControl>

                      <Flex justify="flex-end">
                        <Button
                          type="button"
                          mr={5}
                          onClick={handelCloseOffers}
                        >
                          Reddet
                        </Button>
                        <Button type="submit" bgColor="#20304E" color="white">
                          Onayla
                        </Button>
                      </Flex>
                    </VStack>
                  </form>
                )}
              </>
            ) : (
              <>
                İşleminiz: {offer.status == 1 ? "Onaylandı" : "Reddedildi"}
                {offer.status == 1 ??
                  (offer.senderAdress ? (
                    <>
                      <br />
                      Gönderilecek Adres: {offer.senderAdress}
                    </>
                  ) : null)}
                {offer.userAdress && offer.senderAdress ? (
                  <>
                    {offer.userCargo == null ? (
                      <>
                        <br />
                        <Button
                          type="submit"
                          bgColor="#20304E"
                          color="white"
                          onClick={onOpen}
                        >
                          Kargo Gönder
                        </Button>
                      </>
                    ) : null}
                    {offer.senderCargoStatus == 0 ? (
                      <>
                        <br /> <br />
                        <Tag colorScheme="green" size="lg">
                          Karşı taraf kargoya verdi (Kargo No:{" "}
                          {offer.senderCargoNo})
                        </Tag>
                      </>
                    ) : null}
                    {offer.userCargoStatus == 1 ? (
                      <>
                        <br /> <br />
                        <Tag colorScheme="green" size="lg">
                          Karşı taraf kargoyu teslim aldı (Kargo No:{" "}
                          {offer.senderCargoNo})
                        </Tag>
                      </>
                    ) : offer.userCargoStatus == 0 ? (
                      <>
                        <br />
                        <Tag colorScheme="green" size="lg">
                          Kargo Gönderildi
                        </Tag>
                      </>
                    ) : null}

                    {offer.senderCargoStatus == 1 ? (
                      <div>
                        <Tag colorScheme="green" size="lg" mt={5}>
                          Teslim Alındı
                        </Tag>
                      </div>
                    ) : offer.senderCargoStatus == 0 ? (
                      <div>
                        <Button
                          mt={5}
                          bgColor="#20304E"
                          colorScheme="blue"
                          onClick={() => handelCargoStatus("user")}
                        >
                          Teslim Aldım
                        </Button>
                      </div>
                    ) : null}
                  </>
                ) : null}
              </>
            )}
          </AccordionPanel>
        </AccordionItem>
      </>
    );
  }
}

export default OffersItem;
