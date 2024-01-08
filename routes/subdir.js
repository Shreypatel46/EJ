const express=require('express');
const router=express.Router();
const path=require('path');

router.get('/index(.html)?',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','day-2','part2','index.html'));
});


router.get('/next(.html)?',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','day-2','part2','next.html'));
});
router.get('^/*$',(req,res)=>{
    res.status(404).sendFile(path.join(__dirname,'..','day-2','404.html'));
});

module.exports=  router;