import React from "react";
import Offers from "../../components/Offers";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import NavigationBar from "../../components/NavigationBar";
import { Box, Heading, Text, VStack, Flex, Tag, Image } from "@chakra-ui/react";

const index = () => {
  return (
    <>
      <Navbar />
      <Flex>
        <NavigationBar />
        <Offers />
      </Flex>
      <Footer />
    </>
  );
};

export default index;
