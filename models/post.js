var mongoose = require('mongoose'); 
const mongoosePaginate = require('mongoose-paginate-v2');
var Schema = mongoose.Schema;
  
var PostSchema = new Schema({    
    post_content: {type: String, required:true}, 
    user : {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
},{timestamps: true});

PostSchema.plugin(mongoosePaginate);
  
// export userschema 
module.exports = mongoose.model("Post", PostSchema);