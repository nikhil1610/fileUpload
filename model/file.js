const mongoose = require('mongoose');

const fileSchema = mongoose.Schema(
  {
    urlId:{
      type:String,
      required:true
    },
    original_path: {
      type: String,
      required: true
    },
    short_path: {
      type: String,
      required: true
    },
    file_mimetype: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const File = mongoose.model('File', fileSchema);

module.exports = File;