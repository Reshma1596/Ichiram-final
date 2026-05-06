var mongoose = require('mongoose');

var menuSchema = new mongoose.Schema({
  nameKey: String,
  descriptionKey: String,
  price: Number,
  image: String,
  category: String,
  foodType: String,
  isBestseller: Boolean
});


menuSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model('Menu', menuSchema);