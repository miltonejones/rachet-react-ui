import React from 'react';

import {
  ConnectionForm,
  ColumnForm,
  ConnectionList,
  PaginationBar,
  QueryPane,
  TableList,
  ColumnList,
  DataGrid,
} from './components';

import {
  Collapse,
  Flex,
  IconButton,
  Box,
  Frame,
  Typography,
  css,
  Avatar,
  Dialog,
} from './components/UI/UI';
import { UILib } from './components/UI';
import DocNode from './components/UI/Docs/DocNode';
import useApp from './hooks/useApp';
import { Smiley, Close, Menu } from './icons';

import './style.css';

export default function App() {
  const {
    collapseHeight,
    columnListArgs,
    connectionListArgs,
    connectionFormArgs,
    getPage,
    paginationParams,
    queryPaneArgs,
    setState,
    state,
    table,
    tableDesc,
    tableListArgs,
    tableName,
    tableNames,
    viewPaneCss,
  } = useApp();
  const [open, setOpen] = React.useState(false);
  const CloseIcon = !state.sidebarOpen ? Menu : Close;
  return (
    <div style={viewPaneCss} className="App">
      <Collapse on={state.ratchet} height={collapseHeight}>
        <h1>RatchetUI</h1>
        A component UI for the rest of us.
        <hr />
        {Object.keys(UILib).map((key) => (
          <DocNode key={key} node={UILib[key]} />
        ))}
      </Collapse>

      <Collapse on={!state.ratchet} height={collapseHeight} noscroll>
        <Dialog onClose={() => setOpen(false)} open={open}>
          Well shut my mouth and call me Harriet!!
        </Dialog>
        <Flex>
          <div className="sidebar">
            <Flex align="center">
              {!!state.sidebarOpen && (
                <>
                  <Avatar
                    src="https://www.mysql.com/common/logos/powered-by-mysql-167x86.png"
                    alt="logo"
                    size="large"
                    mr={2}
                    variant="rounded"
                  >
                    a
                  </Avatar>
                  <Box mb={4}>
                    <Typography variant="body1">
                      <b>Ratchet</b>
                      <i>SQL</i>
                    </Typography>
                    <Typography variant="caption">
                      The Internet's base for data.
                    </Typography>
                  </Box>
                </>
              )}
              <Box sx={{ flexGrow: 1 }} />
              <IconButton
                mr={4}
                size="medium"
                onClick={() =>
                  setState({ ...state, sidebarOpen: !state.sidebarOpen })
                }
              >
                <CloseIcon />
              </IconButton>
            </Flex>
            {!!state.sidebarOpen && (
              <Frame offset={40}>
                {/* empty state --- connection form/list */}
                <Collapse on={!tableNames}>
                  <ConnectionList {...connectionListArgs} />
                </Collapse>

                {/* list of tables in the current connection */}
                <Collapse
                  on={!!tableNames}
                  height={!!tableName ? '140px' : 'calc(100vh - 20px)'}
                >
                  {/* table list card */}
                  <TableList {...tableListArgs} />
                </Collapse>

                {/* list of columns in the selected table */}
                {!!tableDesc && <ColumnList {...columnListArgs} />}

                <Collapse mb={5} on={!!state.selectedColumn}>
                  <ColumnForm column={state.selectedColumn} />
                </Collapse>
              </Frame>
            )}
          </div>

          <Flex column className="worksize">
            {!!state.newQuery && <QueryPane {...queryPaneArgs} />}

            {!!table && !!tableDesc && (
              <Box>
                <Flex style={{ width: '100%' }}>
                  <PaginationBar
                    {...paginationParams}
                    click={getPage}
                    label="row"
                  />
                </Flex>

                <div
                  className={css({
                    workpane: 1,
                    worksize: 1,
                    lower: state.newQuery,
                  })}
                >
                  {!!table && <DataGrid table={table} />}
                </div>
              </Box>
            )}
          </Flex>
        </Flex>
      </Collapse>
      <Flex mt={2}>
        <Box sx={{ flexGrow: 1 }} />
        <Flex
          align="center"
          onClick={() => setState({ ...state, ratchet: !state.ratchet })}
        >
          {' '}
          <Box mr={2}>
            Powered by <u className="link">RatchetUI</u>{' '}
          </Box>
          <Smiley />
        </Flex>
      </Flex>

      <Dialog
        height="440px"
        width="340px"
        onClose={() => setState((s) => ({ ...s, connectForm: !1 }))}
        open={state.connectForm}
      >
        <ConnectionForm {...connectionFormArgs} />
      </Dialog>
    </div>
  );
}
