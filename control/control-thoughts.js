const { Thoughts, Users } = require('../models');


const controlThoughts  = {
    getAllThoughts(req, res) {
        Thoughts.find({})
        .select('__v')
        .sort({_id: -1})
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(err => {
            console.log(err);
            res.status(400);
        });
    },


getThoughtsById({ params}, res) =>  {
    Thoughts.findOne({ _id: params.id })
    .populate({
        path: 'thoughts',
        select: '-__v'
    })
    .select('__v')
    .sort({_id: -1})
    .then(dbThoughtsData => res.json(dbThoughtsData))
    .catch(err => {
        console.log(err);
        res.status(400);
    });
}

addThoughts({ params, body }, res) {
    console.log(body);
    Thoughts.create(req.body)
        .then(({ _id }) => {
            return Users.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thought: _id } },
                { new: true }
            );
        })
    .then(dbThoughtsData => {
        console.log(dbThoughtsData);
        if( !dbThoughtsData) {
            res. status(404).json({message: 'error detected'});
            return;
        } 
        res.json(dbThoughtsData);
    })
    .catch(err => res.json(err));
}
updateThought(req, res) {
    Thoughts.findOneAndUpdate({ _id: req.params.id },
         {$set:req.body},
         { new: true, 
        runValidators: true })
        .then(dbThoughtsData => {
if (!dbThoughtsData) {
    res.status(404).json({ message: 'error' });
              return;
}
            res.json(dbThoughtsData);
          })
          .catch(err => res.json(err));
      };
addReaction(req, res) {
    Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body} },
        {new: true, runValidators: true})
        .select('__v')
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(err => {
        res.status(400);
        });
}



      deleteThought({ params }, res) {
        Thoughts.findOneAndDelete({ _id: params.id })
          .then(dbThoughtsData => res.json(dbThoughtsData))
          .catch(err => res.json(err));
      };

};






module.exports = controlThoughts;