var express = require('express');
var router = express.Router();
const ctrl = require('./data.ctrl');


// 모든 데이터 조회
router.get('/', ctrl.getAllData);

//삭제
// router.delete('/:title', ctrl.destory)

//업로드
router.post('/', ctrl.post)

//수정
// router.put('/:pTitle', ctrl.update)

// router.get('/:title', ctrl.show)

module.exports = router;
