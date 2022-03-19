import * as React from "react";
import { Box, Spinner, Stack, Center } from "@chakra-ui/react";
import useSellEvent from "../hooks/useSellEvent";
import useSellItems from "../hooks/useSellItems";
import CustomTable from "./CustomTable";
import { getRolePropText } from "../utils/role";

interface MarketProps {
  nftAddress: string;
}

const columns = [
  {
    Header: "职业信息",
    columns: [
      { Header: "ID", accessor: "id" },
      { Header: "TOKEN ID", accessor: "tokenId" },
      { Header: '职业', accessor: 'info.role'}
    ]
  },
  {
    Header: "属性",
    columns: [
      { Header: '总', accessor: "info.totalAttribute"},
      { Header: '力', accessor: (row) => getRolePropText(row.info, 'strength') },
      { Header: '敏', accessor: (row) => getRolePropText(row.info, "agility") },
      { Header: '体', accessor: (row) => getRolePropText(row.info, "stamina") },
      { Header: '意', accessor: (row) => getRolePropText(row.info, "will") },
      { Header: '智', accessor: (row) => getRolePropText(row.info, "intelligence") },
      { Header: '精', accessor: (row) => getRolePropText(row.info, "mind") },
    ],
  },
  {
    Header: "商品信息",
    columns: [
      { Header: '价格', accessor: 'price' },
    ]
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