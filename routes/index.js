const router = require('express').Router();
const apiRoutes = require('./apis');
router.use('/apis', apiRoutes);

router.use((req, res) => {
    res.status(404).send('<h1> Error!</h1>');
  });
  
  module.exports = router;