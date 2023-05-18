const mysql = require("mysql");

const connection = mysql.createPool({
  charset: "utf8mb4", // 使其能够存储特殊字符
  connectionLimit: 10,
  host: "123.249.35.73",
  user: "vze",
  password: "csz51628@+",
  database: "vze_db",
});

function wrapQuery(sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}

function addAlertData(alertData) {
  return wrapQuery(
    `insert into alert_list (project,env,version,type,data,fixed,hash) values("${alertData.project}","${alertData.env}","${alertData.version}","${alertData.type}",'${alertData.data}',${alertData.fixed},"${alertData.hash}")`
  ).then(console.log).catch(console.log)
}

function getAlertData() {
  return wrapQuery(`select * from alert_list where fixed = false`);
}

function getSpecialAlertData(id) {
  return wrapQuery(`select * from alert_list where id=${id}`);
}

function updateFixed(id) {
  return wrapQuery(`update alert_list set fixed=true where id=${id}`);
}

export {
  connection,
  wrapQuery,
  addAlertData,
  getAlertData,
  getSpecialAlertData,
  updateFixed,
};
