import React from "react";
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import AddBook from "../../components/AddBook"
import NavigationBar from "../../components/NavigationBar" 
import { Box, Heading, Text, VStack, Flex, Tag, Image } from "@chakra-ui/react";


const index = () => {
  return (
    <>
      <Navbar />
      <Flex>
      <NavigationBar/>
      <AddBook/>
      </Flex>

      <Footer/>
    </>
  );

  

};

export default index;

