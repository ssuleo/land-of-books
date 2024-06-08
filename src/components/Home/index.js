import Footer from "../Footer";
import DeviceCard from "../DeviceCard";
import Body from "../Body";
import Navbar from "../Navbar";
import React, { useEffect, useState } from "react";
import DividerText from "../DividerText";
import { Box, Grid } from "@chakra-ui/react";
import axios from "axios";

const home = () => {
  const [datadevices, setDatadevices] = useState(null);
  const data = async () => {
    let response = await axios.get(
      "http://localhost/land-of-devices/backend/page/get/getDevicesAll.php"
    );
    setDatadevices(response.data.data);
    console.log(response.data.data);
  };
  useEffect(() => {
    data();
  }, []);

  return (
    <>
      <Navbar />
      <Body />
      <DividerText />
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        {datadevices &&
          datadevices.map((device, key) => {
            return (
              <DeviceCard
                key={key}
                title={device.devices_name}
                author={device.users_name}
                points={device.point}
                deviceImage={device.device_image}
                brand={device.brand}
              />
            );
          })}{" "}
      </Grid>

      <Footer />
    </>
  );
};

export default home;
