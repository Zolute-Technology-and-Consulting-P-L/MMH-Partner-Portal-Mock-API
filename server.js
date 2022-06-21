var express = require('express');
var app = express();
var fs = require("fs");
const cors = require("cors");

app.get('/partner/customer', function (req, res) {
   fs.readFile( __dirname + "/" + "json/customers.json", 'utf8', function (err, data) {
     
      res.send( data );
   });
})
app.get('/partner/customer/:id', function (req, res) {
   fs.readFile( __dirname + "/" + "json/customer.json", 'utf8', function (err, data) {
     
      res.send( data );
   });
})
app.post('/partner/orderv2', function (req, res) {
   fs.readFile( __dirname + "/" + "json/draftOrderCreate.json", 'utf8', function (err, data) {
     
      res.send( data );
   });
})
app.post('partner/orderv2/products/:orderID', function (req, res) {
   fs.readFile( __dirname + "/" + "json/addProducts.json", 'utf8', function (err, data) {
     
      res.send( data );
   });
})
app.post('/partner/orderv2/coupon/:orderID', function (req, res) {
   fs.readFile( __dirname + "/" + "json/applyCouponCode.json", 'utf8', function (err, data) {
     
      res.send( data );
   });
})
app.post('/partner/orderv2/priority/:orderID', function (req, res) {
   fs.readFile( __dirname + "/" + "json/applyCouponCode.json", 'utf8', function (err, data) {
     
      res.send( data );
   });
})
app.post('/partner/orderv2/activationAmount/', function (req, res) {
   fs.readFile( __dirname + "/" + "json/activationAmount.json", 'utf8', function (err, data) {
     
      res.send( data );
   });
})
app.post('/partner/orderv2/create/:orderID', function (req, res) {
   fs.readFile( __dirname + "/" + "json/createorder.json", 'utf8', function (err, data) {
     
      res.send( data );
   });
})
app.post('partner/orderv2/activationAmount/:orderID', function (req, res) {
   fs.readFile( __dirname + "/" + "json/activationAmountadd.json", 'utf8', function (err, data) {
     
      res.send( data );
   });
})
app.get('partner/Orderv2', function (req, res) {
   fs.readFile( __dirname + "/" + "json/orderlist.json", 'utf8', function (err, data) {
     
      res.send( data );
   });
})
app.get('partner/Orderv2/:orderCode', function (req, res) {
   fs.readFile( __dirname + "/" + "json/orderdetails.json", 'utf8', function (err, data) {
     
      res.send( data );
   });
})
app.get('/partner/Commission', function (req, res) {
   fs.readFile( __dirname + "/" + "json/Commission.json", 'utf8', function (err, data) {
     
      res.send( data );
   });
})
app.get('/partner/Commission/wallet/', function (req, res) {
   fs.readFile( __dirname + "/" + "json/wallet.json", 'utf8', function (err, data) {
     
      res.send( data );
   });
})
app.post('/partner/Commission/withdrawal/', function (req, res) {
   fs.readFile( __dirname + "/" + "json/addwithdrawal.json", 'utf8', function (err, data) {
     
      res.send( data );
   });
})
app.get('/partner/Commission/withdrawalRequest/', function (req, res) {
   fs.readFile( __dirname + "/" + "json/withdrawalRequest.json", 'utf8', function (err, data) {
     
      res.send( data );
   });
})
app.post('/partner/Customer/', function (req, res) {
   fs.readFile( __dirname + "/" + "json/customerdetails.json", 'utf8', function (err, data) {
     
      res.send( data );
   });
})
app.post('/partner/me/veryfyotp', function (req, res) {
   fs.readFile( __dirname + "/" + "json/partnerdetails.json", 'utf8', function (err, data) {
     
      res.send( data );
   });
})
app.post('/partner/customer/verifyotp', function (req, res) {
   fs.readFile( __dirname + "/" + "json/linkcustomerdetails.json", 'utf8', function (err, data) {
     
      res.send( data );
   });
})
app.post('/partner/me/loginotp', function (req, res) {
   fs.readFile( __dirname + "/" + "json/loginotp.json", 'utf8', function (err, data) {
     
      res.send( data );
   });
})
app.post('partner/customer/link', function (req, res) {
   fs.readFile( __dirname + "/" + "json/linkcustomer.json", 'utf8', function (err, data) {
     
      res.send( data );
   });
})


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
   console.log('server listen');
})