import React from 'react';
import { List, Card, Collapse, Flex, Box } from '../UI/UI';
import { Logout, Close, Plus } from '../../icons';

export default function TableList({
  state,
  setState,
  tableName,
  tableNames,
  getTable,
  clearTable,
  setTableNames,
}) {
  const menuItems = [
    <Flex
      align="center"
      mt={1}
      mb={1}
      onClick={() => {
        setState((s) => ({ ...s, newQuery: !s.newQuery }));
        clearTable();
      }}
      className="li selected bold"
    >
      <Plus /> <Box ml={2}>New Query</Box>
    </Flex>,
    <Flex align="center" onClick={() => setTableNames(null)} className="li red">
      <Logout /> <Box ml={2}>Close Connection</Box>
    </Flex>,
  ];
  return (
    <>
      <Card
        style={{ maxWidth: 325, maxHeight: 'calc(100vh - 200px)' }}
        mt={1}
        mb={1}
      >
        {' '}
        <legend>Tables in {state.connectionName}</legend>
        <List
          dense
          items={menuItems.concat(
            tableNames?.map((v, i) => (
              <Collapse
                height="24px"
                noscroll
                on={(!tableName || tableName === v) && !state.newQuery}
                key={i}
                onClick={() => (!tableName ? getTable(v, 1) : clearTable())}
              >
                <Flex
                  align="center"
                  className={v === tableName ? 'li selected' : 'li'}
                >
                  {v === tableName && <Close />}
                  <Box ml={2}>{v}</Box>
                </Flex>
              </Collapse>
            ))
          )}
        />{' '}
      </Card>
    </>
  );
}
