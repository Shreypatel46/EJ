const express =require('express');
const router =express.Router();
const LogOutController =require('../controller/LogOutController');

router.get('/',LogOutController.handleLogOut);

module.exports=router; 