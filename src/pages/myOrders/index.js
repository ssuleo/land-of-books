import React from "react";
import Offers from "../../components/Offers";
import AdminNavbar from "../../components/AdminNavbar";
import Footer from "../../components/Footer";
import NavigationBar from "../../components/NavigationBar";
import { Flex } from "@chakra-ui/react";
import { checkAuthAndRedirect } from "../../../utils/PrivateRouter";

export const getServerSideProps = async (ctx) => {
  return checkAuthAndRedirect(ctx);
};
const index = () => {
  return (
    <>
      <AdminNavbar />
      <Flex>
        <NavigationBar />
asdsadada
      </Flex>
      <Footer />
    </>
  );
};

export default index;
