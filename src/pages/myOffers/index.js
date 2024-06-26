import React from "react";
import Offers from "../../components/Offers";
import AdminNavbar from "../../components/AdminNavbar";
import Footer from "../../components/Footer";
import NavigationBar from "../../components/NavigationBar";
import { Box, Flex } from "@chakra-ui/react";
import { checkAuthAndRedirect } from "../../../utils/PrivateRouter";

export const getServerSideProps = async (ctx) => {
  return checkAuthAndRedirect(ctx);
};

const Index = () => {
  return (
    <>
      <Box minH={"85vh"}>
        <AdminNavbar />
        <Flex flexDirection={{ base: "column", md: "row" }}>
          <NavigationBar />
          <Offers />
        </Flex>
      </Box>
      <Footer />
    </>
  );
};

export default Index;
