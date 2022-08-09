// importing mock data
var users = require('./Users');

// importing express module
const express = require('express')
const app = express()

// middleware function to log requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    next()
})


// api homepage
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Users API! Please use /users to see the list of users.</h1>')
})


// api endpoint to get all users
app.get('/users', (req, res) => {
    res.json(users)
})


// api endpoint to get a single user
app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const user = users.find(user => user.id === id)
    if (!user) return res.status(404).send('User not found')
    res.json(user)
})


// api endpoint to create a new user
app.post('/users', (req, res) => {
    const user = {
        id: users.length + 1,
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        country: req.body.country,
        region: req.body.region
    }
    users.push(user)
    res.json(user)
})


// api endpoint to delete an existing user
app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const user = users.find(user => user.id === id)
    if (!user) return res.status(404).send('User not found')
    const index = users.indexOf(user)
    users.splice(index, 1)
    res.json(user)
})


// api endpoint to update an existing user
app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const user = users.find(user => user.id === id)
    if (!user) return res.status(404).send('User not found')
    user.name = req.body.name ? req.body.name : user.name
    user.phone = req.body.phone ? req.body.phone : user.phone
    user.email = req.body.email ? req.body.email : user.email
    user.country = req.body.country ? req.body.country : user.country
    user.region = req.body.region ? req.body.region : user.region
    res.json(user)
})


// start server
app.listen(3000, () => {
    console.log('Server started on port 3000')
})


