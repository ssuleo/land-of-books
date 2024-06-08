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
                  <Box p={5} marginLeft="90px">
                    <FaArrowRightArrowLeft size="2em"/>
                  </Box>

                  <VStack align="center" marginLeft="90px">
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
          {!offer.status ? (
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
                      <Button type="button" mr={5}>
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