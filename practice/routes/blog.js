//router() , express모듈 불러오기
var express = require('express');
var router = express.Router();

//get으로 api 요청이 들어온다면 아래 로직 실행
router.get('/', (req, res) => {
    const result = {
        status: 300,
        message: "blog 에 접근합니다"
    }
    res.status(200).send(result);
})

//생성한 router 객체를 모듈로 반환
module.exports = router;