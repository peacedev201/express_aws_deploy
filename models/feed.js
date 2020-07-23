var mongoose = require('mongoose'); 
const mongoosePaginate = require('mongoose-paginate-v2');
var Schema = mongoose.Schema;
  
var FeedSchema = new Schema({    
    feed_content: {type: String, required:true, unique:true}, 
    user : {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
},{timestamps: true});

FeedSchema.plugin(mongoosePaginate);
  
// export userschema 
module.exports = mongoose.model("Feed", FeedSchema);
