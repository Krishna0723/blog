const mongoose = require("mongoose")
const blogData=new mongoose.Schema(
    {
        blogName:{type:String,required:true},
        blogContent:{type:String,required:true},
        blogPhotos:{type:Array}
    },{
        collection:"blogs"
    }
)

module.exports=mongoose.model("blogData",blogData);