
import React from "react";
import {
  useTable,
  useSortBy,
  usePagination,
  useFilters,
} from "react-table";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tfoot,
  Flex,
  IconButton,
  Select,
  NumberInput,
  NumberInputField,
  FormControl,
  FormLabel,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { v4 as uuidv4 } from 'uuid';

// todo:
// 1. 过滤条件，1) 过滤合格与不合格 2) 过滤主属性 大于多少 3) 排序 Price
// 2. 前端分页

function CustomTable({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { pageIndex },
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useSortBy,
    usePagination,
  );

  // We don't want to render all 2000 rows for this example, so cap
  // it at 20 for this use case

  return (
    <>
      <Wrap spacing='12px'>
        <WrapItem>
          <FormControl>
            <FormLabel htmlFor='great'>是否合格</FormLabel>
            <Select id='great' defaultValue='all'>
              <option value='all'>全部</option>
              <option value='y'>合格</option>
              <option value='n'>不合格</option>
            </Select>
          </FormControl>
        </WrapItem>
        <WrapItem>
          <FormControl>
            <FormLabel htmlFor='mainAttr'>主属性大于</FormLabel>
            <NumberInput id='mainAttr' placeholder='不填即筛选全部' min={1}>
              <NumberInputField />
            </NumberInput>
          </FormControl>
        </WrapItem>
      </Wrap>
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={uuidv4()}>
              {headerGroup.headers.map((column: any) => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <Th
                  key={uuidv4()}
                  userSelect="none"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  <Flex alignItems="center">
                    {column.render("Header")}
                    {/* Add a sort direction indicator */}
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <ChevronDownIcon ml={1} w={4} h={4} />
                      ) : (
                        <ChevronUpIcon ml={1} w={4} h={4} />
                      )
                    ) : (
                      ""
                    )}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={uuidv4()}>
                {row.cells.map((cell, idx) => {
                  return (
                    <Td key={uuidv4()} {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th colSpan={12}>
              <Wrap spacing='4px' align='center' justify='flex-end'>
                <WrapItem>
                  <IconButton
                    size="sm"
                    variant='outline'
                    colorScheme='teal'
                    aria-label='上一页'
                    fontSize='14px'
                    icon={<ArrowLeftIcon />}
                    disabled={!canPreviousPage}
                    onClick={() => previousPage()}
                  />
                </WrapItem>
                <WrapItem>
                  <span style={{ margin: '0 4px' }}>当前第 {pageIndex + 1} 页 </span>
                </WrapItem>
                <WrapItem>
                  <IconButton
                    size="sm"
                    variant='outline'
                    colorScheme='teal'
                    aria-label='下一页'
                    fontSize='14px'
                    icon={<ArrowRightIcon />}
                    disabled={!canNextPage}
                    onClick={() => nextPage()}
                  />
                </WrapItem>
              </Wrap>
            </Th>
          </Tr>
        </Tfoot>
      </Table>
    </>
  );
}

export default CustomTable;