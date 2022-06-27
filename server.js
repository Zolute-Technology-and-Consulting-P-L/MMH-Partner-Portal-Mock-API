const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');

const CustomerController = require("./controllers/CustomerController");
const PartnerController = require("./controllers/PartnerController");
const customerLink = require("./models/CustomerLink");
const defatOrder = require("./models/DraftOrder");
const auth = require("./middlewares/jwt");
var fs = require("fs");

var cors = require('cors');
const CustomerLink = require('./models/CustomerLink');
const DraftOrder = require('./models/DraftOrder');
const Commission = require('./models/Commission');
const Withdrawal = require('./models/Withdrawal');
const IncommingLead = require('./models/IncommingLead');
const CustomerModel = require('./models/CustomerModel');
const Wallet = require('./models/Wallet');
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
      let reseponse = {}
 
      if(user){
         response = {
            "userDetails": {
                "userID": user._id,
                "firstname": user.firstname,
                "lastname": user.lastname,
                "email": user.email,
                "contact": user.mobile,
                "userCategoryID": 6,
                "currency":"INR"
                
            },
            "partnerDetails":{
            "commission":{
            "direct":20,
            "indirect":10
            },
            "maturity":10,
            "withdrawal":{
            "min":1200,
            "max":2000
            }
            },
            "token": user.mobile
        }
        CustomerLink.deleteMany({}).then((count)=>{
            console.log(count)
        });
        Withdrawal.deleteMany({}).then((count)=>{
         console.log(count);
        })
        Commission.deleteMany({}).then((count)=>{
         console.log(count);
        })
        Wallet.deleteMany({}).then((count)=>{
         console.log(count);
        })
        DraftOrder.deleteMany({}).then((count)=>{
         console.log(count)
         res.json(response)
        });
        
        
      }else{
         res.status(401).json({"msg":"invalid mobile or otp"});
      }
     
     
   }).catch((e)=>{
      res.json(e);
   })
})

app.post('/partner/me/loginotp', function (req, res, next) {
   if(req.body.mobile == 9876543210 && req.body.isd == 91){
      res.json({"msg": "otp has been sent successfully!"});
   }else if(req.body.mobile == 9630308464 && req.body.isd == 91){
      res.json({"msg": "otp has been sent successfully!"});
   }else{
      res.json({"msg": "This mobile number is not belongs to partner"});
   }
   
  
 })

 app.post('/partner/customer/link', auth.authenticateToken, function (req, res) {

   if(req.body.isd=='91' && req.body.mobile != ''){
      CustomerController.customerInfo(req.body.mobile).then((user)=>{
         if(user){
            res.json({
               "msg": "otp sent successfully",
               });
         }else{
            IncommingLead.findOne({contact:req.body.mobile}).then((user)=>{
               if(user){
                  res.json({
                     "msg": "otp sent successfully",
                     });
               }else{
                  res.status(403).json({
                     "msg": "this mobile number is not belongs to customer",
                     });
               }
               
            })
           
         }
      });
     
   }
 
})


app.get('/partner/customer/', auth.authenticateToken, function (req, res) {
      CustomerLink.find({partnerMobile:req.user.mobile}).then((user)=>{
         res.json({
            userDetails:user

         })
      });
})
app.get('/partner/customer/leads',auth.authenticateToken, function (req, res) {
   let response = {
      "totalRecords": 6,
    "limit": 10,
    "page": 1,
   }
   IncommingLead.find({}).then((leads)=>{
      response.leads = leads;
      res.json(response);
   })
})
app.post('/partner/orderv2', auth.authenticateToken, function (req, res) {
   let draftOrder = new DraftOrder();
   draftOrder.plot = req.body;
   draftOrder.customer = {
      firstName:"kian",
      lastName:"choudhary",
      phoneNumber:"9876543212",
      isdCode: "91"
   }
   draftOrder.createdBy = req.user._id;
   draftOrder.orderCode = "V2O202204270002";
   draftOrder.save().then((order)=>{
      res.json(order)
   }).catch((e)=>{
      console.log(e);
      res.status(500).json(e);
   })
})
app.post('/partner/orderv2/products/:orderID', auth.authenticateToken, function (req, res) {
   let body = req.body;
   let productsArr = req.body.products;
   let $product = productsArr[0];
   let d = new Date();
   if($product.id == 18){
      $set = {
         "discountAmount": 0,
        "taxes": [],
        "grossAmount": 5900,
        "netAmount": (5900+1062),
        "gstAmount": "1062",
        "price": "5900"
      }
      productsArr[0].price = 5900;

      let partnerCommi = new Commission({commission_amount:5900/10,commissionPercentage:10,customer:{
         userID:"526541",
         firstname:"kian",
         lastname:"choudhary",
         contact:"9876543212"
      },date:d.toISOString(),matureDate:d.toISOString(),commissionStatus:"Matured",order_code:"V2O202204270002",currency:"INR"});

      let wallet = new Wallet({blance:5900/10,partnerId:req.user._id})
      wallet.save((data)=>{
         console.log(data);
      })
      partnerCommi.save((err,commission)=>{
         console.log(commission)
      })

   }else{
      $set = {
       "discountAmount": 0,
        "taxes": [],
        "grossAmount": 23500,
        "netAmount": (23500+4230),
        "gstAmount":"4230",
        "price": "23500"
      }
      productsArr[0].price = 23500;
     
      let partnerCommi = new Commission({commission_amount:23500/10,commissionPercentage:10,customer:{
         userID:"526541",
         firstname:"kian",
         lastname:"choudhary",
         contact:"9876543212"
      },date:d.toISOString(),matureDate:d.toISOString(),commissionStatus:"Matured",order_code:"V2O202204270002",currency:"INR"});
      partnerCommi.save((err,commission)=>{
         console.log(commission)
      })

      let wallet = new Wallet({blance:23500/10,partnerId:req.user._id})
      wallet.save((data)=>{
         console.log(data);
      })
   }
   
   DraftOrder.updateOne({_id: req.params.orderID}, {$push: {products: {$each: productsArr}},pricing:$set}, {upsert:true}, function(err,result){
      if(err){
              console.log(err);
      }else{
         DraftOrder.findById(req.params.orderID,function(err,order){
                  res.json(order);
              })
      }
   });
})
app.post('/partner/orderv2/coupon/:orderID', function (req, res) {
   DraftOrder.findById(req.params.orderID,function(err,order){
      order.couponCode = req.body.promocode;
      order.save((err,orderInfo)=>{
         res.json(orderInfo);
      })
  })
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
app.get('/partner/orderv2/', auth.authenticateToken, function (req, res) {
   let  data = [];
   var orderCount = 0;
   let $cond = {createdBy:req.user._id}
   if(req.body.orderCode){
      $cond.orderCode = req.body.orderCode;
   }
   DraftOrder.find($cond).then((orders)=>{
      orders.forEach(elem => {
            data.push({
               "orderID": elem._id,
            "orderCode": elem.orderCode,
            "orderedAt": elem.creationTime,
            "projectName": "",
            "orderPaymentMode": null,
            "orderType": "",
            "noOfFloors": 3,
            "orderAmount": elem.pricing.netAmount,
            "orderGstAmount": 0,
            "orderTotalAmount": elem.pricing.grossAmount,
            "ispaid": 0,
            "customer": elem.customer,
            "orderStatus": "Pending Client Approval",
            "version": "v2",
            "payments": [],
            "services": [
                {
                    "id": 1,
                    "servicename": "2D Elevation",
                    "priority": 1,
                    "price": 3050.84,
                    "gst": 549.16,
                    "instant_delivery": 500,
                    "additional_option": 500,
                    "total_amount": 4600,
                    "discount": 0,
                    "activation_amount": 4400,
                    "isActive": false
                },
                {
                    "id": 2,
                    "servicename": "3D Elevation",
                    "priority": 2,
                    "price": 12203.38,
                    "gst": 2196.62,
                    "instant_delivery": 500,
                    "additional_option": 500,
                    "total_amount": 15400,
                    "discount": 0,
                    "activation_amount": 0,
                    "isActive": false
                }
            ],
            "installments": [
                {
                    "id": 1,
                    "amount": 4400
                }
            ]

            })
            orderCount++;
       });
       let response = {
         "totalRecords":orderCount,
         "orders": data
       }
       res.json(response);
   })
 
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

app.get('/partner/Commission',auth.authenticateToken, function (req, res) {
   let response = {
      "totalRecords": 1,
      "limit": 10,
      "page": 1,
   }
   Commission.find({}).then((list)=>{
      response.commissions = list;
      res.json(response);
   })
})
app.get('/partner/Commission/wallet/',auth.authenticateToken, function (req, res) {
  Wallet.findOne({partnerId:req.user._id}).then((walletData)=>{
   res.json(walletData);
  })
})
app.post('/partner/Commission/withdrawal/', auth.authenticateToken, function (req, res) {

   let withDrawlReq = new Withdrawal();
   let d = new Date();
   let amount = req.body.amount;
   if(amount < 1200){
      res.status(403).json({
         "msg": "Withdrawn minimum amount should be  1200 INR"
      });
      return 
   }
   if(amount > 2000){
      res.status(403).json({
         "msg": "Withdrawn maximum 2000 INR"
      })
      return
   }
   withDrawlReq.amount = req.body.amount;
   withDrawlReq.requestdate = d.toUTCString();
   withDrawlReq.date = d.toISOString();
   withDrawlReq.createdBy = req.user._id;

   withDrawlReq.save((err,withdrawal)=>{
      if(err){
         console.log(err)
      }
      res.send({
         "msg": "withdrawal request created"
        
     });
   })
     
      
   
})
app.get('/partner/Commission/withdrawalRequest/', auth.authenticateToken, function (req, res) {
   let response = {
      "totalRecords": 1,
      "limit": 10,
      "page": 1,
   }
   Withdrawal.find({createdBy:req.user._id}).then((list)=>{
      response.withdrawalRequest = list;

      res.json(response);
   })
})
// app.post('/partner/customer', function (req, res) {
//    fs.readFile( __dirname + "/" + "json/customerdetails.json", 'utf8', function (err, data) {
     
//       res.send( data );
//    });
// })

app.post('/partner/customer/verifyotp', auth.authenticateToken, function (req, res) {
   const {mobile,otp} = req.body;
 
   CustomerController.verifyotp({mobile,otp}).then((customer)=>{
   
      if(customer){
         if(customer.linkable == 'linked'){
            res.status(403).json({"msg": "User already exist in system. Contact your manager for details"});
            return
         }else if(customer.linkable == 'unavailable'){
            
            res.status(403).json({ "msg": "Lead status not valid so you hove not permission to create lead"});
            return
         }
         
         let link = new customerLink({
            partnerMobile:req.user.mobile,
            userId:customer._id,
            contact:customer.contact,
            email:customer.email,
            firstname:customer.firstname,
            lastname:customer.lastname
         });
        link.save().then((user)=>{
         res.json({'msg':'customer linked successfully!','data':user});
        }).catch((err)=>{
            res.status(500).json(err);
        });
         
      }else{
          IncommingLead.findOne({contact:req.body.mobile,otp:req.body.otp}).then((incUser)=>{
            if(incUser){
               let link = new customerLink({
                  partnerMobile:req.user.mobile,
                  userId:incUser._id,
                  contact:incUser.contact,
                  email:incUser.email,
                  firstname:incUser.firstname,
                  lastname:incUser.lastname
               });
              link.save().then((user)=>{
               res.json({'msg':'customer linked successfully!','data':user});
              })
            }else{
               res.status(403).json({'msg':'Invalid otp or mobile'});
            }
          })  
         
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