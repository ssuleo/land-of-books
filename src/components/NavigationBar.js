import { Box, Button, Text } from "@chakra-ui/react";
import { navigationBar } from "../../utils/const";
import { useRouter } from 'next/router';

const NavigationBar = () => {
  const router = useRouter();

  return (
    <Box paddingBottom="200px">
      {navigationBar.map(({ info, path }, index) => (
        <Box key={index} marginLeft="20px" paddingTop="40px">
          <Button
            variant="outline"
            bgColor="#20304E"
            color="white"
            w="200px"
            height="50px"
            onClick={() => router.push(path)}  
          >
            <Text mt={2}>{info}</Text>
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default NavigationBar;
