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

//로그인
router.post('/signin',async(req,res)=>{
  const{
    id,
    password
  } = req.body;
  //request data 확인 - 없다면 null value 반환하기
  if(!id || !password){
    res.status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST,resMessage.NULL_VALUE));
    return;
  }
  
  const user = UserModel.filter(user => user.id == id)
  //존재하는 아이디 확인 - 없다면 no user 반환하기
  if (user.length == 0){
    res.status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST,resMessage.NO_USER));
    return;
  }

  //비밀번호 확인 - 없다면 miss match 반환하기
  if (user[0].password !== password){
    res.status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST,resMessage.MISS_MATCH_PW));
    return;
  }


  //성공 확인 - 성공시에 login success와 userid 반환하기
  res.send(statusCode.OK)
    .send(util.success(statusCode.OK,resMessage.READ_PROFILE_SUCCESS,
      {  userId : id }))
})

module.exports = router;