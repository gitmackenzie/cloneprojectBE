const express = require('express');
const User = require('../models/user');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
//token key 보안처리
const fs = require("fs");
const mykey = fs.readFileSync(__dirname + "/../middlewares/key.txt").toString();
// 로그인
router.post("/login", async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email}).exec();
    if (!user) {
        res.status(400).send({errorMessage: '이메일 또는 비밀번호를 확인해주세요'});
        return;
    }
    //암호화 비밀번호 확인
    // const existPw = user.hashedpassword
    // const decryptedPw = CryptoJS.AES.decrypt(existPw,process.env.keyForDecrypt);
    // const originPw = decryptedPw.toString(CryptoJS.enc.Utf8);
    // if (originPw != password) {
    //     res.status(400).send({errorMessage: '이메일 또는 비밀번호를 확인해주세요'});
    //     return;
    // } else {
        const token = jwt.sign({ email : user.email, nickName : user.nickName, userprofile : user.userProfile }, mykey);
        res.json({token})
    // }
});
// 회원가입
router.post("/signUp", async (req, res) => {
    const { email, password, nickName, userProfile} = req.body;
const regexr = /[A-Za-z0-9]{4,20}$/;
const regexr1 = /[A-Za-z0-9]{4,30}$/;
const regexr2 = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
if (!regexr2.test(email)) {
    return res.status(403).send('이메일 형식이 아닙니다.');
} else if (!regexr.test(nickName)) {
    return res.status(403).send('닉네임은 3자리 이상 10자리 이하입니다.');
} else if (!regexr1.test(password)){
    return res.status(403)
    .send('비밀번호는 대문자 및 특수문자를 포함해야 합니다.')
}
    // email, nickname 겹치는지 확인
    const existUsers = await User.find({
        $or:[{email}, {nickName}]
    });
    if (existUsers.length) {
        res.status(400).send({
            errorMessage: '이미 가입된 이메일이 있습니다.',
        });
        return;
    };
    // userProfile 없는 경우
    if (!userProfile) {
        userProfile = "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
    }
    const user = new User({email, nickName, password, userProfile});
    await user.save();
    res.status(201).send({
        message: '회원가입 성공'
    });
});
module.exports = router;