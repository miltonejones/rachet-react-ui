const mysql = require('mysql');
const PAGE_SIZE = 100;

const createPool = (args) =>
  mysql.createPool({ ...args, connectionLimit: 100, debug: false });

const countedQuery = (config, query, page = 1) =>
  new Promise((yes) => {
    const pooldb = createPool(config);
    const offset = (page - 1) * PAGE_SIZE;
    const prevue = `SELECT COUNT (1) as amount FROM (${query}) tally`;
    const actual = `${query} LIMIT ${offset},${PAGE_SIZE}`;
    pooldb.query(prevue, function (ignore, amount) {
      pooldb.query(actual, function (error, rows, fields) {
        const count = !amount?.length ? 0 : amount[0].amount;
        yes({ rows, count, error, fields });
      });
    });
  });

const execQuery = (config, query) =>
  new Promise((yes) => {
    const pooldb = createPool(config);
    pooldb.query(query, function (error, rows, fields) {
      yes({ error, rows, fields, config, query });
    });
  });

const descriptionSQL = (
  table,
  database
) => `SELECT col.COLUMN_NAME, col.IS_NULLABLE, 
         col.COLUMN_DEFAULT, col.COLUMN_TYPE, u.CONSTRAINT_NAME, u.TABLE_NAME,
         u.REFERENCED_TABLE_NAME, u.REFERENCED_COLUMN_NAME 
  FROM INFORMATION_SCHEMA.COLUMNS col LEFT JOIN information_schema.key_column_usage u ON
        (u.TABLE_NAME = col.TABLE_NAME OR u.REFERENCED_TABLE_NAME = col.TABLE_NAME) AND 
        (u.COLUMN_NAME = col.COLUMN_NAME OR u.REFERENCED_COLUMN_NAME = col.COLUMN_NAME)
  WHERE col.table_name = '${table}'
  AND col.table_schema = '${database}'
  group by col.COLUMN_NAME
  order by col.COLUMN_NAME`;

const describeTable = (config, table) =>
  new Promise((yes) => {
    const query = descriptionSQL(table, config.database);
    const pool = createPool(config);
    pool.query(query, function (error, rows, fields) {
      yes({ error, rows, fields, config, query });
    });
  });

exports.handler = async (event) => {
  let body;
  const { routeKey, pathParameters } = event;
  const { page = 1, table } = pathParameters ?? {};

  switch (routeKey) {
    case 'PUT /connect':
      body = await execQuery(JSON.parse(event.body).config, 'show tables');
      break;
    case 'PUT /show/{table}':
      body = await describeTable(JSON.parse(event.body).config, table);
      break;
    case 'PUT /open/{page}/{table}':
      body = await countedQuery(
        JSON.parse(event.body).config,
        `SELECT * FROM ${table}`,
        page
      );
      break;
    case 'PUT /query/{page}':
      body = await countedQuery(
        JSON.parse(event.body).config,
        JSON.parse(event.body).query,
        page
      );
      break;
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify(body, 0, 2),
  };
  return response;
};
