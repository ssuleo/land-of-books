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
  const [deviceData, setdeviceData] = useState(null);

  const getUser = async () => {
    const response = await axios.get(
      "http://localhost/land-of-devices/backend/page/getUser.php?authToken=" +
        getCookie("authToken")
    );
    setUserData(response.data);
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
    getUser();
    getdevice();
  }, []);

  return (
    <>
      <AdminNavbar />

      {userData && deviceData ? (
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

              {/* Cihazlar bölümü */}
              <Box>
                <Text fontSize="xl" mb={2}>
                  Cihazların
                </Text>
                {/* Yan yana 3 Cihaz kartı */}
                <SimpleGrid
                  columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
                  spacing={4}
                >
                  {deviceData.map((device) => (
                    <Card
                      key={device.iddevices}
                      boxShadow="md"
                      borderRadius="md"
                      p={4}
                    >
                      <Image
                        src={
                          "http://localhost/land-of-devices/backend/uploads/" +
                          device.device_image
                        }
                        alt={device.devices_name}
                        borderRadius="md"
                        mb={2}
                      />
                      <Text fontWeight="bold">{device.devices_name}</Text>
                      <Text>{device.brand}</Text>
                      <Text>Puan: {device.point}</Text>
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
