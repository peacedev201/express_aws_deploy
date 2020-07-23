module.exports = app => {
    
    const connectEnsureLogin    = require("connect-ensure-login");
    var router                  = require("express").Router();
    var multer                  = require('multer');
    var helpers                 = require('../helpers/helpers');
    var path                    = require('path');
    //upload image
    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, 'public/uploads/');
        },
    
        // By default, multer removes file extensions so let's add them back
        filename: function(req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
    });
    var upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).single('file');
    router.post('/image',upload, (req, res) => {
        // 'profile_pic' is the name of our file input field in the HTML form
            // req.file contains information of uploaded file
            // req.body contains information of text fields, if there were any
            upload(req, res, function(err, data){
                if (req.fileValidationError) {
                return res.send(req.fileValidationError);
                }
                else if (!req.file) {
                    return res.send('Please select an image to upload');
                }
                else if (err instanceof multer.MulterError) {
                    return res.send(err);
                }
                else if (err) {
                    return res.send(err);
                }
                // Display uploaded image for user validation
                console.log(req.file.filename);
                res.send({link: '/uploads/'+req.file.filename});
            });
       
    });
    app.use('/upload', router);
    
}