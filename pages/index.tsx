import type { NextPage } from "next";
import * as React from "react";
import { QueryClient, QueryClientProvider, QueryCache } from "react-query";
import { ChakraProvider, Box, Heading } from "@chakra-ui/react";
import { Toaster, toast } from "react-hot-toast";
import { Provider as WagmiProvider } from "wagmi";
import { providers } from "ethers";
import theme from "../theme";
import Market from "../components/Market";

// Provider that will be used when no wallet is connected (aka no signer)
const provider = providers.getDefaultProvider(
  "https://bsc-dataseed1.defibit.io"
);

// Create a react-query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: () => {
      toast.error(
        "Network Error: Ensure Metamask is connected to the same network that your contract is deployed to."
      );
    },
  }),
});

const App: NextPage = () => {
  return (
    <WagmiProvider autoConnect provider={provider}>
      <ChakraProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
              <Box p={8} maxW="1200px" minW="320px" m="0 auto">
                <Market nftAddress="0x307135a29962f0b338c0103e06e8e7d03bd7267f" />
                <Toaster position="bottom-right" />
              </Box>
          </QueryClientProvider>
      </ChakraProvider>
    </WagmiProvider>
  );
};

export default App;
