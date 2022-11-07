function selectAll(table) {
  return `select * from ${table} where active=true`;
}

function selectSingle(table, id) {
  return `select * from ${table} where id=${id}`;
}

function softDeleteSingle(table, id) {
  return `update ${table} set active=0 where id=${id}`;
}

module.exports = { selectAll, selectSingle, softDeleteSingle };
