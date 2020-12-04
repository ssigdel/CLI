const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//connect to the database
const db = mongoose.connect('mongodb://localhost:27017/Bookamender_Lib',
{ useNewUrlParser: true, useUnifiedTopology: true });

const User = require('./models/user');

//add user
const addUser = (user) => {
    const newUser = new User({
        name: user.name,
        email: user.email,
        password: user.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              console.info('New user added')
            })
            .catch(err => console.log(err));
        });
      });
}

//find user
const findUser = (name) => {
    const search = new RegExp(name, 'i');
    User.find({$or:[{name: search}]})
    .then(user => {
        console.info(user);
        console.log(`${user.length} matches`);
        db.close;
    }).catch( err => {
        throw err;
    });
}

//update user
const updateUser = (_id, user) =>{
    User.updateOne({_id}, user)
     .then(user => {
         console.info('User updated');
         db.close;
     });
}

//remove user 
const removeUser = (_id) =>{
    User.deleteOne({_id})
     .then(user => {
         console.info('User removed');
         db.close;
     });
}

//list users
const listUsers = () =>{
    User.find()
     .then(users => {
         console.info(users);
         console.info(`${users.length} users`);
         db.close;
     })
}


//export
module.exports = {
    addUser,
    findUser,
    updateUser,
    removeUser,
    listUsers
}