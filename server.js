const express = require('express')
let mysql = require('mysql');

const app = express()
app.use(express.json());

const port = 3000

let connection = mysql.createConnection({
  host     : 'localhost',
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


app.get('/ingredients-list', (req, res) => {
    const start = req.body.start || 0;
    const quantity = req.body.quantity || 10;

    connection.query(
        `SELECT * FROM ingredients LIMIT ${start}, ${quantity};`,
        function (error, results, fields){
            if (error) throw error;
            res.send(JSON.stringify(results))
        }
    )
})


app.get('/recipe', (req, res) => {
    const start = req.body.start || 0;
    const quantity = req.body.quantity || 10;

    connection.query(
        `SELECT i.name, ir.amount, ir.unit FROM recipes r, ingredients i, ingredients_for_recipes ir WHERE r.ID = ir.recipe_ID and i.ID = ir.ingredient_ID AND r.title LIKE "przepistest";`,
        `SELECT title, summary, link FROM recipes WHERE title LIKE "`
        function (error, results, fields){
            if (error) throw error;
            res.send({

            })
        }
    )
})


app.post('/add-ingredient', function(req, res){
    const ingName = req.body.name;

    connection.query(
        `INSERT INTO ingredients 
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

function gracefulshutdown() {
    server.close(()=>{
        console.log("Shutting down");
        connection.end();
        process.exit(0);
    })
}

process.on("SIGTERM", gracefulshutdown);
process.on("SIGINT", gracefulshutdown);