// server.js
// BASE SETUP
var mongoose = require('mongoose');
mongoose.connect('mongodb://stessa:stessa@ds121189.mlab.com:21189/stessa'); // connect to our database
// =============================================================================

var Shipment = require('./app/models/shipment');
var Order = require('./app/models/order');



const apiKey = 'BqyYIkSK2sV3HfjmUI8hvw';
const EasyPost = require('@easypost/api');

const api = new EasyPost(apiKey);

// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var port = process.env.PORT || 8080; // set our port

// ROUTES FOR OUR API


var router = express.Router(); // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({
        message: 'hooray! welcome to our api!'
    });
});

// more routes for our API will happen here

router.route('/shipment')
    .post(function(req, res) {

        var shipment = new Shipment();
        shipment.toAddress = req.body.toAddress;
        shipment.fromAddress = req.body.fromAddress;
        shipment.parcel = req.body.parcel;


        // set addresses
        const toAddress = new api.Address(shipment.toAddress);
        const fromAddress = new api.Address(shipment.fromAddress);
        const parcel = new api.Parcel(shipment.parcel);


        ep_shipment = new api.Shipment({
            to_address: shipment.toAddress,
            from_address: shipment.fromAddress,
            parcel: shipment.parcel
        });



        ep_shipment.save().then(function(value) {
            res.json({
                shipping_id: value.id
            });
        });

    });


router.route('/order')
    .post(function(req, res) {
        var order = new Order();
        order.shipping_id = req.body.shippingId;
        order.toAddress = req.body.toAddress;
        order.fromAddress = req.body.fromAddress;

        const ep_order = new api.Order({
            to_address: order.toAddress,
            from_address: order.fromAddress,
            shipments: order.shipping_id
        });

        ep_order.save().then(function(value) {
            res.json({
                toAddress: order.toAddress,
                fromAddress: order.fromAddress,
                shippingid: order.shipping_id,
                data: value
            });
        }).catch((error) => {
            console.log(error, 'Promise error');
        });
    });

app.use('/api', router);

var router = express.Router(); // get an instance of the express Router

router.get('/', function(req, res) {
    res.json({
        message: 'hooray! welcome to our api!'
    });
});
app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);