const dbmgr = require("./dbmanager.js");
const db = dbmgr.db;

exports.getAllUser = () => {
  const sql = "select * from User";
  const data = db.prepare(sql);
  return data.all();
};

exports.getUserById = (Id) => {
  const sql = `select * from User where Id = ?`;
  const data = db.prepare(sql);
  return data.run(Id);
};

exports.addUser = async (user) => {
  db.serialize(() => {
    // const users = this.getUserById(user.Id);
    // if(users === null) {
    const sql = `INSERT INTO User VALUES(?,?,?,?,?,?)`;
    //const stmt = db.prepare(sql);
    data.run(
      sql,
      [
        user.id,
        user.email,
        user.phone,
        user.branch_name,
        user.first_name,
        user.user_name,
      ],
      (err) => {
        if (err) return console.log(err.message);

        console.log("Insert Successfully");
      }
    );
    //stmt.finalize();
  });
};
