
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const StackerModel = require('./stacks')
const UserModel = require('./User')
const habitModel = require('./habits')
require('dotenv').config();

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

    habitModel.create({
        title: title,
        difficulty: difficulty,
        counter: counter,
    })
    .then(result => res.json(result))
    .catch(err => console.log(err));

})


app.delete("/habits/delete/:id", async(req, res) => {

    const {id} = req.params;

    habitModel.delete({
        _id: id
    })
    .then(result => result.json(result))
    .catch(err => console.log(err));

})

app.listen(3001, () => {

console.log('The app is listening on 3001')

})