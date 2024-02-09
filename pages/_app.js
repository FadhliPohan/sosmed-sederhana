import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import "@/styles/assets/vendor/aos/aos.css";
import "@/styles/assets/vendor/bootstrap/css/bootstrap.min.css";
import "@/styles/assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "@/styles/assets/vendor/boxicons/css/boxicons.min.css";
import "@/styles/assets/vendor/glightbox/css/glightbox.min.css";
import "@/styles/assets/vendor/swiper/swiper-bundle.min.css";

import "@/styles/assets/css/style.css";

import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { UserContextProvider } from "@/context/userContact";

const theme = extendTheme({
  // Chakra UI theme configuration (optional)
});

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <UserContextProvider>
        <Component {...pageProps} />
      </UserContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
