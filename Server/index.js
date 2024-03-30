import express from "express"
import cors from "cors";
import mysql2 from "mysql2"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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

app.get("/stacks", (req, res) => {

    const sql = "SELECT * FROM tasks";

    db.query(sql, (err, data) => {

        if(err){
            res.json(err);
        }else{
            res.json(data);
        }
    })

})

// Get stacks from only one user!

app.get("/userStack",(req, res) => {


    const userId = req.query.userId;
    const sql = "SELECT * FROM tasks WHERE userId = ?";

    db.query(sql, [userId], (err,data) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: "Failed to retrieve Tasks" });
          } else {
            console.log("Task from the user have been retrieved!", userId);
            res.status(200).json(data);
          }
    })
       
})

app.post("/stacks", (req,res) => {

    const sql = "INSERT INTO tasks (`content`, `difficulty`, `userId`) VALUES (?)";

    const values = [
        req.body.content,
        req.body.difficulty,
        req.body.userId
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

const JWT_SECRET = "key";

const generateToken = (userId) => {

    return jwt.sign({userId}, JWT_SECRET, {expiresIn: "1h"});

}

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
   
    const hashedPassword = await bcrypt.hash(password, 10);
     const sql = "INSERT INTO users (`username`, `email`, `password`) VALUES (?)";

    const values = [
        req.body.username,
        req.body.email,
        hashedPassword,
    ]

    db.query(sql, [values], (err, data) => {

        if(err){
           return console.log(err);
        }else{
           return res.json("user has been created");
        }
    })

 }catch(err){
    return console.log(err);
 }
})

app.post("/login", async (req, res) => {

    const {email, password, username} = req.body;

    const sql = "SELECT * FROM users WHERE `email` = ?"

    db.query(sql, [email], async (err, data) => {

        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" });
        }

        if (data.length === 0) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        try{
            const isPasswordValid = await bcrypt.compare(password, data[0].password);

            console.log(req.body)
            console.log(password)
            console.log("hashed pass", data[0].password)
            console.log(email)
            console.log(isPasswordValid)

            if(!isPasswordValid){
                return res.status(401).json({ error: "Invalid email or password aa" });
            }

            const token = generateToken(data[0].userId);
            
            const user = {
                id: data[0].id,
                username: data[0].username,
                email: data[0].email,
            }

            return res.json({ message: "Login successful", token, user });


        }catch(err){
            return console.log(err);
        }
    })
})