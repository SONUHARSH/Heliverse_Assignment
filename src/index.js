const express = require('express');
const mongoose = require('mongoose');
const Users = require('./model/users'); 

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/api/users', async (req, res) => {

        try {
            const users = await Users.find();
            res.json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }

});

app.get('/api/users/:id', async (req, res) => {

        try {
            const userId = req.params.id;
            const user = await Users.findOne({ id: userId });
    
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }

});
 
app.delete('/api/users/:id', async (req, res) => {
        try {
            const userId = req.params.id;
            const deletedUser = await Users.findOneAndDelete({ id: userId });
    
            if (!deletedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            res.json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    
});

app.post('/api/users', async (req, res) => {

        try {
            const newUser = {
                id: req.body.id, 
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                gender: req.body.gender,
                avatar: req.body.avatar,
                domain: req.body.domain,
                available: req.body.available,
            };
    
            if (!newUser.first_name || !newUser.last_name || !newUser.email || !newUser.gender || !newUser.avatar || !newUser.domain || newUser.available === undefined) {
                return res.status(400).json({ message: 'Bad Request' });
            }
    
            const createdUser = await Users.create(newUser);
            res.status(201).json(createdUser);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }

});
    

app.put('/api/users/:id', async (req, res) => {

        try {
            const userId = req.params.id;
            const updatedUserData = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                gender: req.body.gender,
                avatar: req.body.avatar,
                domain: req.body.domain,
                available: req.body.available,
            };
    
            if (!updatedUserData.first_name || !updatedUserData.last_name || !updatedUserData.email || !updatedUserData.gender 
                || !updatedUserData.avatar || !updatedUserData.domain || updatedUserData.available === undefined) {
                return res.status(400).json({ message: 'Bad Request' });
            }
    
            
            const updatedUser = await Users.findByIdAndUpdate(userId, updatedUserData, { new: true });
    
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            res.json(updatedUser);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }

});
         
app.listen(3005, async () => {
        console.log("server is started at 3005");


        mongoose.connect('mongodb+srv://SK:mongo1@cluster0.sotcqky.mongodb.net/');
        console.log("mongoose DB is connected")

});



/* {"id":1,"first_name":"Anet","last_name":"Doe","email":"adoe0@comcast.net","gender":"Female",
"avatar":"https://robohash.org/sintessequaerat.png?size=50x50&set=set1","domain":"Sales","available":false}, 

*/