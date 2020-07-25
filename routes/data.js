var express = require('express');
var router = express.Router();
const ctrl = require('./data.ctrl');


// 모든 데이터 조회
router.get('/', ctrl.getAllData);

//삭제
router.delete('/:id', ctrl.destory)

//업로드
router.post('/', ctrl.post)

//수정
router.put('/:id', ctrl.update)

//수정페이지
router.get('/editpage', ctrl.editpage)


module.exports = router;
