
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const StackerModel = require('./stacks')
const UserModel = require('./User')
const habitModel = require('./habits')
require('dotenv').config({ path: '.env.production' });

const app = express()

app.use(express.json())
app.use(cors())
mongoose.connect(process.env.MONGO)


app.post('/add', (req, res) => {

    const content = req.body.content;
    const difficulty = req.body.difficulty;
    const userId = req.body.userId;

    StackerModel.create({

        content: content,
        difficulty: difficulty,
        user: userId

    })
    .then(result => res.json(result))
    .catch(err => console.log(err))

})


app.get('/get', (req, res) => {
    
    StackerModel.find()
    .then(result => res.json(result))
    .catch(err => console.log(err))

})

app.get('/get/:userId', (req, res) => {
    StackerModel.find({user: req.params.userId})
    .then(result => res.json(result))
    .catch(err => res.status(500).json({error: err.message}))
})

app.delete('/delete/:id', (req,res) => {

    const {id} = req.params;

    StackerModel.findOneAndDelete({

        _id: id

    })
    .then(result => res.json(result))
    .catch(err => console.log(err))
})

app.put('/update/:id', (req, res) => {

    const {id} = req.params;
    const content = req.body.content;
    const difficulty = req.body.difficulty;

    StackerModel.findOneAndUpdate(
        {_id: id},
        {content: content, difficulty: difficulty},
        { new: true })
        
    .then(result => res.json(result))
    .catch(err => console.log(err))

})

// Register And Login Methods

app.post('/register', async (req, res) => {

    const {username, email, password} = req.body;

    const user = await UserModel.create(({username, email, password}));

    res.json(user)

})


app.post('/login', async (req, res) => {

    const {email, password} = req.body;

    const user = await UserModel.findOne({email, password});

    if(user){
        res.json({success: true, userId: user._id, username: user.username})
    }else{
        res.json({success: false})
    }

})

// Habits Methods

app.post('/habits', async (req, res) => {

    const title = req.body.title;
    const difficulty = req.body.difficulty;
    const counter = req.body.counter;
    const userId = req.body.user; 

    habitModel.create({
        title: title,
        difficulty: difficulty,
        counter: counter,
        user: userId
    })
    .then(result => res.json(result))
    .catch(err => console.log(err));

})

app.delete("/habits/delete/:id", async(req, res) => {

    const {id} = req.params;

    habitModel.findOneAndDelete({
        _id: id
    })
    .then(result => res.json(result))
    .catch(err => console.log(err));

})

app.get('/geth/:userId', (req, res) => {
    habitModel.find({
        user: req.params.userId,
    })
    .then(result => res.json(result))
    .catch(err => res.status(500).json({error: err.message}))
})


app.put("/habits/updateCounter/:id", async (req, res) => {

    const {id} = req.params;
    const counter = req.body.counter;

    habitModel.findOneAndUpdate(
        {_id: id},
        {counter: counter},
        {new: true}
    )
    .then(result => res.json(result))
    .catch(err => err.json())
})

app.put("/habits/update/:id", async(req, res) => {

    const {id} = req.params;
    const title = req.body.title;
    const difficulty = req.body.difficulty;

    habitModel.findOneAndUpdate(
        {_id: id},
        {title: title, difficulty: difficulty},
        {new: true}
    ).then(result => res.json(result))
    .catch(err => console.log(err));

})

// DELETE ALL

app.delete("/deleteAllUsers", async (req, res) => {
  try {

    await StackerModel.deleteMany({});
    await habitModel.deleteMany({});
    await UserModel.deleteMany({});
    
    res.json({ success: true, message: "All users, tasks, and habits have been deleted." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Delete USER and Respectives

app.delete("/deleteUser/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Deleta o usuário
    const user = await UserModel.findOneAndDelete({ _id: id });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    await StackerModel.deleteMany({ user: id });
    await habitModel.deleteMany({ user: id });

    res.json({ success: true, message: "User and all related tasks & habits deleted." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// PORT

app.listen( 3001, () => {

console.log('The app is listening on 3001')

})