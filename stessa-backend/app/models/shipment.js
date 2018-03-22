
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ShipmentSchema   = new Schema({
    toAddress: Object,
    fromAddress : Object,
    parcel : Object,
});

module.exports = mongoose.model('Shipment', ShipmentSchema);
