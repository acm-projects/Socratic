const multer = require("multer"); //middleware for handling file uploads so that we can upload files to the server

const upload = multer({ storage: multer.memoryStorage() }); //multer configuring file storage

module.exports = upload; //exporting the uploaded files so that it can be used in other files
