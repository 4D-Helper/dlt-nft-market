import * as React from "react";
import { Box, Spinner, Stack, Center } from "@chakra-ui/react";
import useSellEvent from "../hooks/useSellEvent";
import useSellItems from "../hooks/useSellItems";
import CustomTable from "./CustomTable";

interface MarketProps {
  nftAddress: string;
}

const Market: React.FunctionComponent<MarketProps> = ({ nftAddress }) => {
  const query = useSellItems({ nftAddress });

  useSellEvent({ nftAddress });

  const columns = React.useMemo(
    () => [
      {
        Header: "职业信息",
        columns: [
          {
            Header: "ID",
            accessor: "id"
          },
          {
            Header: "TOKEN ID",
            accessor: "tokenId"
          },
          {
            Header: 'Price',
            accessor: 'price'
          }
        ]
      },
      {
        Header: "属性",
        
      }
    ],
    []
  );

  return (
    <Box>
      {query.isLoading && (
        <Center p={8}>
          <Spinner />
        </Center>
      )}
      <Stack spacing={4}>
       {query.data && <CustomTable columns={columns} data={query.data}></CustomTable>}
      </Stack>
    </Box>
  );
};

export default Market;