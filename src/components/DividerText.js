import React from "react";
import { Text, Divider, Center } from "@chakra-ui/react";
const DividerText = () => {
  return (
    <>
      {" "}
      <Center flexDirection="column" my={4}>
        <Divider />
        <Text fontWeight="600" fontSize="50"my={2}>
          BOOKS
        </Text>

        <Divider />
      </Center>
    </>
  );
};

export default DividerText;
