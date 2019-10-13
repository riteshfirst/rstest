const express = require('express');
const sql = require('mssql') ;
const multer =require('multer') ;
const upload = multer({dest : 'uploads/'});
const sname ="ABC-PC" + "\\" + "SQLEXPRESSNEW" ;
const app =express() ;

var bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

var config = {
    user: 'node',
    password: 'node',
    server: sname,
    
    database: 'Practice'
    
};

app.use(function (req, res, next) {

    
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:63342');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


app.use('/add',(req,res)=>{

    res.send('Hello World ');


   // sql.connect(config, function (err) {
   //     if (err) console.log(err);

        // create Request object
//        var request = new sql.Request();
  //      request.query('select * from Course', function (err, recordset) {
            
    //        if (err) console.log(err)

            // send records as a response
//            res.send(recordset);
            
  //      });

//    });

})




app.post('/create',upload.single('productimage') ,(req,res)=>{

    //res.send('Hello World ');
    console.log(req.body.ptype) ;
    console.log(req.body.quantity) ;
console.log(req.file);
console.log('hi') ;
const ptype = req.body.ptype ;
const category = req.body.category ;
const location = req.body.location ;
const quantity = req.body.quantity ;

sql.close()  ;
    sql.connect(config, function (err) {
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
        var sqlupd = 'INSERT INTO Products (PTYPE,PCATEGORY,LOCATION,QUANTITY) Values (' ;
        sqlupd +=  "'" + ptype +"'," +"'" + category +"','"+ location +"','" + quantity +"')"  ;

        console.log (sqlupd) ;

        request.query(sqlupd, function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            
        });

    });

})

const PORT = 7300;

app.listen(PORT, function(){
    console.log('Server is listening ...')
})


