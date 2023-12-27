const {getposts, uploadpost,likepost}=require("../controllers/postscontroller");
const {upload}=require("../middleware/profilepicmiddleware");
const router = require("express").Router();
router.get("/getposts",getposts);
router.post("/uploadpost",upload.single('postpic'),uploadpost);
router.post("/likepost",likepost);
module.exports=router;