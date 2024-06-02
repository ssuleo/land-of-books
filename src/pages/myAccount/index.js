import React from "react";
import AdminNavbar from "../../components/AdminNavbar";
import Footer from "../../components/Footer";
import NavigationBar from "../../components/NavigationBar";
import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { checkAuthAndRedirect } from "../../../utils/PrivateRouter";
import MyOffersComp from "./myOffersComp";
import MyCargoComp from "./myCargoComp";

export const getServerSideProps = async (ctx) => {
  return checkAuthAndRedirect(ctx);
};
const index = () => {
  return (
    <>
      <AdminNavbar />
      <Flex flexDirection={{ base: "column", md: "row" }} minH={"75vh"}>
        <NavigationBar />
        <Tabs isFitted variant='enclosed' w={"full"}>
          <TabList mb='1em'>
            <Tab>Teklif Verdiklerim</Tab>
    
            <Tab>Kargoda Olan Kitaplar</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <MyOffersComp />
            </TabPanel>

            <TabPanel>
              <MyCargoComp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
      <Footer />
    </>
  );
};

export default index;
