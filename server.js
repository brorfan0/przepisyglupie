const express = require('express')
let mysql = require('mysql');

const app = express()
app.use(express.json());

const port = 3000

let connection = mysql.createConnection({
  host     : 'localhost',
//   host: '0.0.0.0',
  user     : 'root',
  port: 3306,
  password : 'password',
  database : 'przepisy'
});

connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);
  });

app.get('/color', (req, res) => {
    res.send({color: "red"})
})


app.get('/ingredients-list', (req, res) => {
    const start = req.body.start || 0;
    const quantity = req.body.quantity || 10;

    connection.query(
        `SELECT * FROM skladniki LIMIT ${start}, ${quantity};`,
        function (error, results, fields){
            if (error) throw error;
            res.send(JSON.stringify(results))
        }
    )
})


app.post('/add-ingredient', function(req, res){
    const ingName = req.body.name;

    connection.query(
        `INSERT INTO skladniki 
            VALUES (null, "${ingName}")`,
        function (error, results, fields){
            if (error) throw error;
            console.log(results, fields);
        }
    )

    res.send({status: "ok"})
})



const server = app.listen(port,() => {
  console.log(`Example app listening on port ${port}`)
})

server.addListener("SIGINT", ()=>{
    console.log("closing kurwa")
    connection.end();
})
