var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var widgetSchema = new Schema({
  name: String,
  color: {type: String, enum: ['Red', 'Blue', 'Yellow', 'Green', 'Orange', 'Purple']},
  size: {type: String, enum: ['Huge', 'Big', 'Medium', 'Small', 'Tiny']},
  inventory: {type: Number, min: 0},
});

var Widget = mongoose.model('Widget', widgetSchema);

module.exports = Widget;
