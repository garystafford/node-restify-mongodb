var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var widgetSchema = new Schema({
  product_id: {type: String, required: true},
  name: {type: String, required: true},
  color: {
    type: String, required: true,
    enum: ['Red', 'Blue', 'Yellow', 'Green', 'Orange', 'Purple', 'White', 'Black']
  },
  size: {
    type: String, required: true,
    enum: ['Huge', 'Big', 'Medium', 'Small', 'Tiny']
  },
  price: {type: Currency, required: true},
  inventory: {type: Number, required: true, min: 0},
});

//Transform
widgetSchema.set('toJSON', {
  virtuals: true
});

widgetSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    ret.price = Number(ret.price / 100).toFixed(2);
  }
});

var Widget = mongoose.model('Widget', widgetSchema);

module.exports = Widget;
