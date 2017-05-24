/**
 * Created by myeongsic on 2017. 3. 29..
 */
const express = require('express');
const route = express.Router();
const user = require('../controller/user')
const auth = require('../auth/auth')
const path = require('path');
const multer = require('multer')

//var upload = multer({dest: 'images/'})


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
function fileFilter (req, file, cb) {

    // The function should call `cb` with a boolean
    // to indicate if the file should be accepted



    if(file.mimetype ==="image/png"){
        // To accept the file pass `true`, like so:
        cb(null, true)
    }else {
        // To reject this file pass `false`, like so:
        cb(null, false)
    }




    // You can always pass an error if something goes wrong:
    //cb(new Error('I don\'t have a clue!'))

}


var upload = multer({storage: storage,fileFilter:fileFilter,limits:{fileSize:500000}})

route.get('/home', (req, res) => {

    res.sendFile(path.resolve(__dirname, '..', 'view', 'index.html'))

})


route.route('/image')

    .get((req, res) => {

        res.sendFile(path.resolve(__dirname, '..', 'images', 'background.jpg'))

    })
    .post(upload.single('avatar'),(req, res, next) =>{

        res.send(req.file)
        
    })


route.route('/user')
    .post(user.createUser)
    .get(auth.isBasicAuthenticated, user.readUser)
    .put(auth.isBasicAuthenticated, user.updateUser)
    .delete(auth.isBasicAuthenticated, user.deleteUser)


route.route('/test')
    .get((req, res) => {

        console.log(req.query)

        res.send("확인")
    })
    .post((req, res) => {

        console.log(req.body)
        res.send("POST방식")

    })


route.route('/test/:id')
    .get((req, res) => {
        //데이터를 업데이트, 삭제

        console.log(req)

        res.send("확인2")
    })


module.exports = route;


//Create = Post = 회원가입
//Read = Get = 로그인
//Update = Put = 회원정보수정
//Delete = Delete = 탈퇴