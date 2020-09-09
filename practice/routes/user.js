var express = require('express');
var router = express.Router();
let UserModel = require('../models/user');
let util = require('../modules/util');
let statusCode = require('../modules/statusCode');
let resMessage = require('../modules/responseMessage');

/* GET users listing. */
//회원가입 로직
/*
router.post('./signup',async (req,res)=>{
  const {id,name,password,email} = req.body;
  User.push({id,name,password,email});
  res.status(200).send(User);
});
*/

//회원가입
router.post('/signup', async (req, res) => {
  const {
      id,
      name,
      password,
      email
  } = req.body;
  // request data 확인 - 없다면 Null Value 반환
  if (!id || !name || !password || !email) {
      res.status(statusCode.BAD_REQUEST)
          .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
      return;
  }
  //already ID
  if (UserModel.filter(user => user.id == id).length > 0) {
      res.status(statusCode.BAD_REQUEST)
          .send(util.fail(statusCode.BAD_REQUEST, resMessage.ALREADY_ID));
      return;
  }
  UserModel.push({
      id,
      name,
      password,
      email
  });
  res.status(statusCode.OK)
      .send(util.success(statusCode.OK, resMessage.CREATED_USER, {
          usersId: id
      }));
});



module.exports = router;