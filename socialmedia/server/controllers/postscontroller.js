const posts = require("../models/posts")
const {firebaseconfig}=require('../firebaseconfig');
const {initializeApp}=require('firebase/app');
const { getStorage, ref, uploadBytes,getDownloadURL,deleteObject }=require('firebase/storage');
const userModel = require("../models/userModel");
//-----------------------------------------------------------------------------------------------

const app=initializeApp(firebaseconfig);
const storage=getStorage(app);
//-----------------------------------------------------------------------------------------------

module.exports.getposts=async(req,res,next)=>{
    try{
  let data=  await posts.find().sort({createdAt:-1});
     data=await Promise.all(data.map(async(p)=>{
    const user= await userModel.findOne({_id:p.creator});
    let likedfound=false,lovedfound=false;
    p.reactions.find(reaction => {
        if(reaction.reactor.toString() ===req.userid){
           if(reaction.emoji==='👍'){
            likedfound=true;
           }
           else if(reaction.emoji=== '❤️')
           lovedfound=true;
        } 
        return 0;
    }
    );

    const formattedTime = p.createdAt.toLocaleDateString('en-US', {
        month:'long',
        day:'numeric',
        year:'numeric',
        hour: 'numeric',
        minute: 'numeric',
        
      });
    return{
        username:user.username,
        picture:p.picture,
        caption:p.caption,
        createdAt:formattedTime,
        _id:user._id,
        profileImage:user.profileImage,
        postid:p._id,
        alreadyliked:likedfound,
        alreadyloved:lovedfound,
        nooflikes:p.reactions?.length
    }
  }));
  res.json({data});
    }
    catch(err){console.log(err);}
}
module.exports.uploadpost=async(req,res,next)=>{
    try{
        const allowedImageTypes = ['image/jpeg', 'image/png', 'image/svg+xml']; 
        const allowedsize=1024*1024; 
        if(req.file && allowedImageTypes.includes(req.file.mimetype) && req.file.size<=allowedsize){
        
       const picurl=`postspictures/${Date.now()}-${req.file.originalname}`
       const fileref=ref(storage,picurl);
       const uploadedfile=await uploadBytes(fileref,req.file.buffer,{contentType:req.file.mimetype});
       const filelink=await getDownloadURL(uploadedfile.ref);
       await posts.create({creator:req.userid,picture:filelink,caption:req.body.caption});
    
    return res.status(200).json({pic:filelink});
    }
}
    catch(err){console.log(err);}
}
module.exports.likepost=async(req,res,next)=>{
    try{
    let update=false,index=-1;
    const post=await posts.findOne({_id:req.body.postid});
    let found=post.reactions.find((reaction,idx)=> {
        if(reaction.reactor.toString() ===req.userid){
           if(reaction.emoji!==req.body.emoji){
            index=idx;
            update=true; 
          }
          return 1;
        }
        return 0;
    });
    if(update){post.reactions[index].emoji=req.body.emoji; await post.save();}
    if(!found){
    const result = await posts.updateOne(
        { _id: req.body.postid},
        { $push: { reactions: { reactor:req.userid, emoji: req.body.emoji } } }
      );
    }
    
}catch(err){console.log(err);}
}