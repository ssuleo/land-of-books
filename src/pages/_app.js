import { ChakraProvider } from "@chakra-ui/react";
import {NavbarProvider }from "../context/NavbarContext";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <NavbarProvider>
        <Component {...pageProps} />
      </NavbarProvider>
    </ChakraProvider>
  );
}

export default MyApp;
