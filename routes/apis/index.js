const router = require('express').Router();
const thoughtroute = require('./route-thoughts');
const userroute = require('./routes-users');

router.use('/thoughts', thoughtroute);
router.use("/users", userroute);

module.exports = router;