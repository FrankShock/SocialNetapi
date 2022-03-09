const router = require('express').Router();
const  { getAllThoughts, getThoughtsById, addThoughts, updateThought,  deleteThought
} =require('../../control/control-thoughts');
router
.route('/')
.get(getAllThoughts)
.post(addThoughts);
router
.route('/:id')
.get(getThoughtsById)
.put(updateThought)
.delete(deleteThought)

module.exports = router 