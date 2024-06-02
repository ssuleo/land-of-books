import React from "react";
import AdminNavbar from "../../components/AdminNavbar"
import Footer from "../../components/Footer"
import AddBook from "../../components/AddBook"
import NavigationBar from "../../components/NavigationBar"
import { Box, Flex } from "@chakra-ui/react";

import { checkAuthAndRedirect } from "../../../utils/PrivateRouter";

export const getServerSideProps = async (ctx) => {
  return checkAuthAndRedirect(ctx);
};

const index = () => {
  return (
    <>

        <AdminNavbar />
        <Flex flexDirection={{ base: "column", md: "row" }}>
          <NavigationBar />
          <AddBook />
        </Flex>
    
      <Footer />
    </>
  );
};

export default index;
