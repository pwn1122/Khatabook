const express = require('express');
const Users = require('../models/users')
const bycrpt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');

const secret = 'bshbuiwbdbb8**bduug2gx';


router.post('/Signup',async (req , res) =>{
    const data = req.body;
    try{
        const salt = await bycrpt.genSalt()
        const newpassword = await bycrpt.hash(data.password , salt)
        data.password = newpassword;
        const newuser = await Users.create(data);
        const token = await jwt.sign({ _id: newuser._id }, secret)
        res.cookie('jwt', token,{
            httpOnly:true,
            maxAge: 24*60*60*1000
        });
        res.status(201).json(newuser);
       }

       catch(err){
        res.status(501).json(err)
       }
})

router.get('/logout', (req , res) => {
    console.log('ah')
     if(req.cookies.jwt){
        res.clearCookie('jwt');
        res.status(200).send('ok')
     }
     else{
        res.status(400).json('you have not any token for logout')
     }
})

router.get('/check', async (req, res) => {
   
    const token = req.cookies.jwt;
    console.log('token', token)
    if(!token){
       return res.status(400).json({msg: 'ok'})
    }
    try{
        const data = await jwt.verify(token , secret);
        console.log(data)
        const user =await Users.findOne({ _id: data._id});

        if(user){
            res.status(200).json({msg: 'ok'})
        }
        else{
            res.status(401).json({error :' invalid token'});
        }
    }
    catch(err){
        res.status(401).json(err);
    }
})

router.post('/login', async (req , res) =>{
    const data = req.body;
     console.log(data)
    try{
        const user = await Users.findOne({email:data.email });
        console.log('hi', user)
        if(!user){
            return res.status(401).json({error : 'invalid email or password'})
        }

        const ismatching = await bycrpt.compare(data.password , user.password);
        if(!ismatching){
            return res.status(401).json({ error: 'invalid email or password'});
        }
        console.log('match')
    const token = await jwt.sign({_id: user._id} , secret)

    res.cookie('jwt', token ,{
        httpOnly:true,
        maxAge: 24*60*60*1000
    })
    res.status(200).json(user);
         
    }
    catch(err){
    res.status(501).json(err);
    }
})

module.exports = router
