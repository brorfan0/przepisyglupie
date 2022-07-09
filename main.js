let mysql      = require('mysql');
let connection = mysql.createConnection({
  host     : 'localhost',
//   host: '0.0.0.0',
  user     : 'root',
  port: 3306,
  password : 'password',
  database : 'przepisy'
});

let skladniki;
 
connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);
  });
 
// connection.query(
//     `CREATE TABLE skladniki(
//         id int auto_increment,
//         name varchar(40),
//         primary key (id))`,
//     function (error, results, fields){
//         if (error) throw error;
//         console.log(results, fields);
//     }
// )

// connection.query(
//     `INSERT INTO skladniki 
//         VALUES (null, "cukier")`,
//     function (error, results, fields){
//         if (error) throw error;
//         console.log(results, fields);
//     }
// )

// connection.query(
//     `SELECT * FROM skladniki"`,
//     function (error, results, fields){
//         if (error) throw error;
//         console.log(results[1].name);
//     }
// )
 
connection.end();