var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

//생성한 폴더의 index에 접근하기 위해서
router.use('/api', require('./api'))
router.use('/blog', require('./blog'))
router.use('/user', require('./user'));

module.exports = router;