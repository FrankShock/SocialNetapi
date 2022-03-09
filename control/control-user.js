const {Users} = require('../models');
const userControl = {

createUsers({body}, res) {
Users.create(body)
.then(dbThoughtsData = res.json(dbThoughtsData))
.catch(err => res.json(err));

},
getUsersById({params}, res) {
    Users.findOne({_id: params.id })
    .populate({path: 'thoughts', select: '-__v'})
    .populate({path: 'friends', select: '-__v'})
    .select('-__v')
 
    .then(dbThoughtsData => {
    if(!dbThoughtsData) {
         res.status(404).json({message: 'Cannot find a User with this ID!'});
        return; 
    }
        res.json(dbUsersData)
    })
    .catch(err => {
    console.log(err);
    res.status(400).json(err)
    })
},
//get all users
getAllUsers(req, res) {
    Users.find({})
    .populate({path: 'thoughts', select: '-__v'})
    .populate({path: 'friends', select: '-__v'})
    .select('-__v')
    .then(dbThoughtsData => res.json(dbThoughtsData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
},
updateUser({ params, body }, res){
User.findOneAndUpdate({ _id: params.id }, body, { new: true })
.then(dbUserData => {
    if(!dbThoughtsData) {
    res.status(404).json({message: 'Cannot find a User with this ID!'});
return;
}
res.json(dbUserData);
})
.catch(err => res.status(400).json(err))
},

addFriend({ params }, res) {
User.findOneAndUpdate({ _id: params.userId }, { $push: { friends: params.friendId } }, { new: true })
.then(dbUserData => {
    if(!dbThoughtsData) {
    res.status(404).json({message: 'Cannot find a User with this ID!'});
return;
}
res.json(dbUserData);
})
.catch(err => res.status(400).json(err))
},

removeFriend({ params }, res) {
    User.findOneAndUpdate({ _id: params.userId }, { $push: { friends: params.friendId } }, { new: true })
    .then(dbUserData => {
        if(!dbThoughtsData) {
        res.status(404).json({message: 'Cannot find a User with this ID!'});
    return;
    }
    res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err))
    },
    



};
module.exports = userControl;