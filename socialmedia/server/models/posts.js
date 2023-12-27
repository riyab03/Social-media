const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema(
  {
   creator:{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
   picture:{type:String},
   reactions:[{reactor:{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' },emoji:{type:String}}],
   caption:{type:String}
  }
  ,{timestamps:true}
  );
  
  module.exports= mongoose.model('Posts', postsSchema);