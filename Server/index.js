import express from "express"
import cors from "cors";
import mysql2 from "mysql2"

const app = express();
app.use(express.json());
app.use(cors());

app.listen(8800, () => {
    console.log("backend is up!")
})

app.get("/", (req, res) => {
    res.json("Welcome to the backend")
})

const db = mysql2.createConnection({
    host: "localhost",
    database: "mytodolist",
    user: "root",
    password: "nath26an"
})

// Default Tasks

app.get("/default", (req, res) => {

    const sql = "SELECT * FROM defaultTasks"

    db.query(sql, (err, data) => {

        if(err){
            return res.json(err)
        }else{
            return res.json(data);
        }
    }) 
})

app.post("/default", (req, res) => {

    const sql = "INSERT INTO defaultTasks (`content`, `difficulty`) VALUES (?)";

    const values = [
        req.body.content,
        req.body.difficulty,
    ]

    db.query(sql, [values],(err, data) => {

        if(err){
            return res.json(err)
        }else{
           return res.json("task has been created")
        }
    })
})

app.delete("/default/:id", (req, res) => {

    const userID = req.params.id;
    const sql = "DELETE FROM defaultTasks WHERE id = ?"

    db.query(sql, [userID], (err, data) => {

        if(err){
            return res.json(err);
        }else{
            return res.json("Task has been deleted");
        }
    })

})

app.put("/default/:id", (req, res) => {

    const bookId = req.params.id;

    const sql = "UPDATE defaultTasks SET `content`= ?,  `difficulty`= ?  WHERE id = ?"

    const values = [
        req.body.content,
        req.body.difficulty,
    ]

    db.query(sql, [...values, bookId], (err,data) => {
        
        if(err){
            return res.json(err);
        }else{
            return res.json("Task has been updated!");
        }
    })
})

// General Tasks

app.get("/Stacks", (req, res) => {

    const sql = "SELECT * FROM tasks";

    db.query(sql, (err, data) => {

        if(err){
            res.json(err);
        }else{
            res.json(data);
        }
    })

})

app.post("/Stacks", (req,res) => {

    const sql = "INSERT INTO tasks (`content`, `difficulty`) VALUES (?)";

    const values = [
        req.body.content,
        req.body.difficulty,
    ]

    db.query(sql,[values], (err, data) => {
        if(err){
            console.log(err);
        }else{
            res.json(data);
        }
    })
})


app.delete("/Stacks/:id", (req, res) => {

    const userID = req.params.id;

    const sql = "DELETE from tasks WHERE id = ?";

    db.query(sql, [userID], (err,data) => {
        if(err){
            return res.json(err);
        }else{
            return res.json("Stack has been successfully deleted!");
        }
    })
})

app.put("/Stacks/:id", (req, res) => {

    const userId = req.params.id;
    const sql = "UPDATE tasks SET `content` = ?, `difficulty` = ? WHERE id = ?";

    const values = [
        req.body.content,
        req.body.difficulty,
    ]

    db.query(sql, [...values, userId ], (err, data) => {

        if(err){
            console.log(err);
        }else{
            res.json(data);
        }

    })
})

// Users

app.get("/users", (req, res) => {

    const sql = "SELECT * from users";

    db.query(sql, (err, data) => {

        if(err){
            console.log(err);
        }else{
            res.json(data);
        }
    });
})

app.post("/users", async (req, res) => {

    const {username, email, password} = req.body;

    try{
    const sql = "INSERT INTO users (`username`, `email`, `password`) VALUES (?)";

    const values = [
        req.body.username,
        req.body.email,
        req.body.password,
    ]

    db.query(sql, [values], (err, data) => {

        if(err){
            console.log(err);
        }else{
            res.json("user has been created");
        }
    })

 }catch(err){
    console.log(err);
 }
})