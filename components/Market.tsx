import * as React from "react";
import { Box, Spinner, Stack, Center } from "@chakra-ui/react";
import useSellEvent from "../hooks/useSellEvent";
import useSellItems from "../hooks/useSellItems";
import CustomTable from "./CustomTable";

interface MarketProps {
  nftAddress: string;
}

const columns = [
  {
    Header: "职业信息",
    columns: [
      { Header: "ID", accessor: "id" },
      { Header: "TOKEN ID", accessor: "tokenId" },
      { Header: 'Price', accessor: 'price' }
    ]
  },
  {
    Header: "属性",
    columns: [
      { Header: '力', accessor: 'info.strength' },
      { Header: '敏', accessor: 'info.agility' },
      { Header: '体', accessor: 'info.stamina' },
      { Header: '意', accessor: 'info.will' },
      { Header: '智', accessor: 'info.intelligence' },
      { Header: '精', accessor: 'info.mind' },
      { Header: '总', accessor: 'info.totalAttribute' },
    ],
  }
];

const Market: React.FunctionComponent<MarketProps> = ({ nftAddress }) => {
  const query = useSellItems({ nftAddress });

  useSellEvent({ nftAddress });

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