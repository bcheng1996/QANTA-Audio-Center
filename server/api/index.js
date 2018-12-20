var express = require('express');
var router = express.Router();
var FileReader = require('filereader');
var fs = require('fs');
var multer = require('multer');

var storage = multer.diskStorage(
    {
        destination: __dirname + '/public/uploads/',
        filename: function(req, file, callback) {
            callback(null, req.body.fname + "_" + Date.now() + "_" + file.originalname+'.wav');
        }
    }
);

var upload = multer({
    storage: storage
}).single('data');


// middleware to use for all requests
router.use(function (req, res, next) {
    next();
});

// GET http://localhost:8080/api
router.get('/', function (req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.post('/addAudio', function (req, res){
    // req should contain a blob
    upload(req, res, function(err) {
        console.log(req);
        if (err) {
            console.log(err);
        } else {
            console.log(req);
        }
    });
});

router.get('/getAllAudio', function (req, res) {
    fs.readdir(__dirname + '/public/uploads', (err, files) => {
       res.json(files);
    })
})

router.get('/playAudio', function (req, res) {
    let fname = req.query.f;
        let dir = __dirname + '/public/uploads/' + fname;
        console.log('Playing Audio: ', fname)
        fs.readFile(dir,function (err,data) {
            res.send(data);
        });
    
})

//
// import other routes here?
//


module.exports = router;