import React from "react";
import NavigationBar from "../../components/NavigationBar";
import Footer from "../../components/Footer";
import { checkAuthAndRedirect } from "../../../utils/PrivateRouter";
import AdminNavbar from "../../components/AdminNavbar";
import UserProfile from "../../components/UserProfile";
import { Box, Flex } from "@chakra-ui/react";
const index = () => {
  return (
    <>
      <AdminNavbar />
      <Flex>
        <Box flex="1" d="flex" alignItems="center" justifyContent="center">
          <UserProfile />
        </Box>
      </Flex>
      <Footer />
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  return checkAuthAndRedirect(ctx);
};

export default index;
