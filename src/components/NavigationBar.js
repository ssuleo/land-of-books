import { Box, Button, Text, Grid } from "@chakra-ui/react";
import { navigationBar } from "../../utils/const";
import { useRouter } from 'next/router';

const NavigationBar = () => {
  const router = useRouter();

  return (
    <Box paddingBottom="100px" p={2} mr={100}>
      <Grid
        templateColumns={{ base: "repeat(2, 1fr)", md: "1fr" }}
        gap={{ base: "20px", md: "0" }}
      >
        {navigationBar.map(({ info, path, disable }, index) => (
          !disable && (
            <Box key={index}>
              <Button
                variant="outline"
                bgColor="#20304E"
                color="white"
                w="175px"
                height="50px"
                my={5}
                onClick={() => router.push(path)}
              >
                <Text mt={2}>{info}</Text>
              </Button>
            </Box>
          )
        ))}
      </Grid>
    </Box>
  );
};

export default NavigationBar;
