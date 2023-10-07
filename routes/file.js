const path = require('path');
const express = require('express');
const multer = require('multer');
const File = require('../model/file');
const  shortid = require("shortid");
const Router = express.Router();
require('dotenv').config();
const cloudinary = require('cloudinary');
const { error } = require('console');
// cloudinary.config({ 
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//   api_key: process.env.CLOUDINARY_API_KEY, 
//   api_secret:  process.env.CLOUDINARY_API_SECRET
// });
          
cloudinary.config({ 
  cloud_name: 'dmi3wzhkn', 
  api_key: '593218671844567', 
  api_secret: 'EHJvZDTrA6ipsS_uEqgfltR_JWI' 
});

const upload = multer({
  storage: multer.diskStorage({
    // destination(req, file, cb) {
    //   cb(null, './files');
    // },
    // filename(req, file, cb) {
    //   cb(null, `${new Date().getTime()}_${file.originalname}`);
    // }
  }),
  limits: {
    fileSize: 2000000 // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx)$/)) {
      return cb(
        new Error(
          'Only upload files with jpg, jpeg, png, pdf, doc, docx format.'
        )
      );
    }
    cb(undefined, true); // continue with upload
  }
});

Router.post(
  '/upload',
  upload.single('file'),
  async (req, res) => {
    console.log(req.file);
    const base = "https://bts-url";

    try {
        
      cloudinary.v2.uploader.upload(req.file.path).then(async (data)=>{
        console.log(data.url);
        const url=data.url;
        const urlId = shortid.generate(url);
        const { mimetype } = req.file;

        const file = new File({
          urlId,
          original_path: data.url,
          short_path:`${base}/${urlId}`,
          file_mimetype: mimetype,
        });
        const fileData = await file.save();
            const responseData = {
              message:"File uploaded successfuly.",
              fileData:fileData
            }
    
            res.send(JSON.stringify(responseData));  
    
      }).catch((error)=>{
        console.log(error);
        res.status(400).send('Error while uploading file. Please, try again later.');
      });  
    } catch (error) {
      console.log(error);
      res.status(400).send('Error while uploading file. Please, try again later.');
    }
  },
  (error, req, res, next) => {
    if (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  }
);


Router.get('/download/:id', async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    res.set({
      'Content-Type': file.file_mimetype
    });
    res.sendFile(path.join(__dirname, '..', file.file_path));
  } catch (error) {
    res.status(400).send('Error while downloading file. Please, try again later.');
  }
});

module.exports = Router;