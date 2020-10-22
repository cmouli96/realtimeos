var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fileUpload=require('express-fileupload');
// var cat=require('cat');
var shell = require('shelljs');
var multer=require('multer');
router.use(fileUpload());
var fs=require('fs');
var Binary = require('mongodb').Binary;

// var multer=require("multer");

// var storage=multer.diskStorage({
//   destination:function(req,file,cb){
//     cb(null,"uploads")
//   },
//   filename:function(req,file,cb){
//     cb(null,file.fieldname+"-"+Date.now()+".txt")
//   }
// })
// var upload=multer({
//   storage: storage,
//   fileFilter: function(req,file,cb){
//     var filetypes=/txt/;
//     var mimetype=filetypes.test(file.mimetype);
//     var extname=filetypes.test(path.extname(
//       file.originalname).toLowerCase());
//       if(mimetype&&extname){
//         return cb(null,true);
//       }
//       cb("Error:File upload only supports the"+"Following filetypes-"+filetypes);
//   }
// }).single("myfile");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/*learning stage*/
router.get('/helloworld',function(req,res){
  res.render('helloworld',{title:'Hello World!'});
});
/* GET Userlist page. */
router.get('/userlist', function(req, res) {
  var db = req.db;
  var collection = db.get('usercollection');
  // collection.findOne({}).toArray(function(err, documents) {
  //   if (err) console.error(err);
  //       file_name=fs.writeFile('file_name', documents[0].file_data.buffer, function(err){
  //           if (err) throw err;
  //           console.log('Sucessfully saved!');
  //       });
  // });
  file_name={};
    collection.find({},{},function(e,docs){
      // fs.writeFile('file_name',docs[0].file_data.buffer)
      // console.log(docs[0].insert_data);
      fs.writeFile('file_name.txt', docs[0].insert_data.file_data.buffer, function(err){
        if (err) throw err;
        console.log(file_name);
    });
        // res.render('userlist', {
        //     userlist: file_name
        // });
    });
    // collection.findOne({}).toArray(function(err, documents) {
    //   if (err) console.error(err);
    //       file_name=fs.writeFile('file_name', documents[0].file_data.buffer, function(err){
    //           if (err) throw err;
    //           console.log('Sucessfully saved!');
    //       });
    // });
    // doc=file_name.toArray();
  // collection.find().toArray(function(err, documents) {
  //   if (err) console.error(err);
  //       file_name=fs.writeFile('file_name', documents[0].file_data.buffer, function(err){
  //           if (err) throw err;
  //           console.log('Sucessfully saved!');
  //       });
  // });
    res.render('userlist',{
      userlist: file_name
    })
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
  res.render('newuser', { title: 'Add New User' });
});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {

  // Set our internal DB variable
  var db = req.db;

  // Get our form values. These rely on the "name" attributes
  // var userName = req.body.username;
  var file=req.files.sampleFile;
  var name=file.name;
  var data=fs.readFile(name,'utf8',function(err, val){ 
    console.log(val); 
 })
  var insert_data={};
  insert_data.file_data=Binary(data);
  // var name=file.name;
  // var userName=req.files.sampleFile.userName;
  // console.log(name);
  // console.log(userName);
  // var str=cat(name).exec(file2);

  // console.log(name);
  // console.log(insert_data.file_data);
  // var userEmail = req.body.useremail;

//   upload(req,res,function(err) { 
  
//     // if(err) { 

//     //     // ERROR occured (here it can be occured due 
//     //     // to uploading image of size greater than 
//     //     // 1MB or uploading different file type) 
//     //     res.send(err) 
//     // } 
//     // else { 

//     //     // SUCCESS, image successfully uploaded 
//     //     res.send("Success, Image uploaded!") 
//     // } 
//     res.redirect("userlist");
// }) 
  // Set our collection
  var collection = db.get('usercollection');
  // cat(userName,console.log);
  // Submit to the DB
  collection.insert({
      // "username" : userName,
      // 'file':file
      insert_data
      // "email" : userEmail
  }, function (err, doc) {
      if (err) {
          // If it failed, return error
          res.send("There was a problem adding the information to the database.");
      }
      else {
          // And forward to success page
          res.redirect("userlist");
      }
  });

});

module.exports = router;
