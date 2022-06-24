const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');

const CustomerController = require("./controllers/CustomerController");
const PartnerController = require("./controllers/PartnerController");
const customerLink = require("./models/CustomerLink");
const auth = require("./middlewares/jwt");
var fs = require("fs");

var cors = require('cors');
const CustomerLink = require('./models/CustomerLink');
app.use(cors());



const mongoString = process.env.DBURL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
});




app.use(express.json());



// app.get('/partner/customer/',CustomerController.customerList);

app.post('/partner/customer', function (req, res) {
   
      CustomerController.create(req.body).then((data)=>{
         res.json(data);
      }).catch((err)=>{
         res.status(400).json(err);
      });
})

app.post('/partner/me/veryfyotp', function (req, res,next) {
   const {mobile,otp} = req.body;
   PartnerController.verifyOtp({mobile,otp}).then((user)=>{
      console.log(user)
      user ? res.json(user) : res.status(401).json({"msg":"invalid mobile or otp"});
     
   }).catch((e)=>{
      res.json(e);
   })
})

app.post('/partner/me/loginotp', function (req, res, next) {
   
   res.json({"msg": "otp has been sent successfully!"});
  
 })

 app.post('/partner/customer/link', auth.authenticateToken, function (req, res) {

   if(req.body.isd=='91' && req.body.mobile != ''){

     res.json({
      "msg": "otp sent successfully",
  });
   }
 
})


app.get('/partner/customer/', auth.authenticateToken, function (req, res) {
      CustomerLink.find({partnerMobile:req.user.mobile}).then((users)=>{
         res.json(users);
      });
      
      
})
// app.get('/partner/customer/:id', function (req, res) {
//    if(req.params.id=="leads"){
//       fs.readFile( __dirname + "/" + "json/incominglead.json", 'utf8', function (err, data) {
     
//          res.send( data );
//       });
//    }else{
    
//    fs.readFile( __dirname + "/" + "json/customer.json", 'utf8', function (err, data) {
     
//       res.send( data );
//    });
//    }
// })
app.post('/partner/orderv2', function (req, res) {
   fs.readFile( __dirname + "/" + "json/draftOrderCreate.json", 'utf8', function (err, data) {
     
      res.send( data );
   });
})
app.post('/partner/orderv2/products/:orderID', function (req, res) {
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
app.post('/partner/orderv2/activationAmount/:orderID', function (req, res) {
   fs.readFile( __dirname + "/" + "json/activationAmountadd.json", 'utf8', function (err, data) {
     
      res.send( data );
   });
})
app.get('/partner/orderv2/', function (req, res) {
   fs.readFile( __dirname + "/" + "json/orderlist.json", 'utf8', function (err, data) {
     
      res.send( data ); 
   });
})

app.get('/partner/orderv2/:orderCode', function (req, res) {
   fs.readFile( __dirname + "/" + "json/orderdetails.json", 'utf8', function (err, data) {
     
      res.send( data );
   });
})
app.get('/public/productsv2/:orderid', function (req, res) {
   fs.readFile( __dirname + "/" + "json/productsv2.json", 'utf8', function (err, data) {
     
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
app.post('/partner/customer', function (req, res) {
   fs.readFile( __dirname + "/" + "json/customerdetails.json", 'utf8', function (err, data) {
     
      res.send( data );
   });
})

app.post('/partner/customer/verifyotp', auth.authenticateToken, function (req, res) {
   const {mobile,otp} = req.body;
   CustomerController.verifyotp({mobile,otp}).then((customer)=>{
      if(customer){
         let link = new customerLink({
            partnerMobile:req.user.mobile,
            mobile:customer.mobile,
            email:customer.email,
            name:customer.name
         });
        link.save().then((user)=>{
         res.json({'msg':'customer linked successfully!','data':user});
        });
         
      }else{
         res.status(403).json({'msg':'Invalid otp or mobile'});
      }
   }).catch((e)=>{
      console.log(e);
   })
  
   
})
// app.post('/partner/me/loginotp', function (req, res, next) {
//    if(req.body.isd=='91' && req.body.mobile=='9993336666'){
//       fs.readFile( __dirname + "/" + "json/loginotp.json", 'utf8', function (err, data) {
     
//          res.send( data );
//       });
//    }else{
//       fs.readFile( __dirname + "/" + "json/errorloginotp.json", 'utf8', function (err, data) {
//          res.statusCode = 403;
//          res.send( data );
//       });
//    }
  
// })





const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
   console.log(`server is listen on ${PORT}`);
})