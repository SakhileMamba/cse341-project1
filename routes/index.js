const router = require('express').Router();

router.get('/', (req, res) => {
  //#swagger.tags=['Hello World']
  res.send('Hello world');
});

router.use('/contacts', require('./contacts'));

router.use('/', require('./swagger'));

module.exports = router;
