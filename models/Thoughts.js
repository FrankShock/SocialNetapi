const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

const ReactionSchema = new Schema(
{
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true
    },
    writtenBy: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format('MMMM Do YYYY')
    }
},
{
    toJSON: {
        getters: true
    }
}

);

const ThoughtsSchema = new Schema(
{
thoughtText:{
type: String,
required: true

},
writtenBy: {
    type: String,
    required: true,
    trim: true

},
reactions: [ReactionSchema]
},
{
    toJSON: {
        getters: true
    }
}

);

const Thoughts = model('Thoughts', ThoughtsSchema);

module.exports = Thoughts 

