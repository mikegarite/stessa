
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var OrderSchema   = new Schema({
    toAddress: Object,
    fromAddress : Object,
    parcel : Object,
});

module.exports = mongoose.model('Order', OrderSchema);
