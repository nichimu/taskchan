var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PostSchema   = new Schema({
    task: {type:String, required: "何か入力してください"}
});

module.exports = mongoose.model('Post', PostSchema);