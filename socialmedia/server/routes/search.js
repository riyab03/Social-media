const {searchfriends,getuserprofiledetails,showwholeprofile}=require('../controllers/searchcontroller');
const router = require("express").Router();
router.get('/searchfriends',searchfriends);
router.get('/getuserprofiledetails/:id',getuserprofiledetails);
router.get('/showwholeprofile/:id',showwholeprofile);
module.exports=router;