import { Table, TableProps, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import get from 'lodash.get';

type Props = {
    columns: { key: string; label: string; w?: string }[];
    data: Array<Record<string, string | number>>;
} & TableProps;

const TableCusTom = ({ columns, data, ...props }: Props) => {
    return (
        <Table {...props}>
            <Thead>
                <Tr>
                    {columns?.length > 0
                        ? columns.map(({ key, label, w }) => {
                              return (
                                  <Th key={key} w={w}>
                                      {label}
                                  </Th>
                              );
                          })
                        : null}
                </Tr>
            </Thead>
            <Tbody>
                {data?.length > 0
                    ? data?.map((item, index) => {
                          return (
                              <Tr key={index}>
                                  {columns?.map((itemColumn, indexColumn) => {
                                      return <Td key={indexColumn}>{get(item, itemColumn.key)}</Td>;
                                  })}
                              </Tr>
                          );
                      })
                    : null}
            </Tbody>
        </Table>
    );
};

export default TableCusTom;
