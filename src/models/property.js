let mongoose = require('mongoose');

const propertiesDSN = process.env.MONGODB_DSN;

mongoose.connect(propertiesDSN, { useNewUrlParser: true });
mongoose.set('debug', true);

let ValueSchema = new mongoose.Schema({
  "value" : {
    "en" : String
  },
  "active" : {
    "type": Boolean,
    "required": true
  },
  "id" : {
    "type": Number,
    "required": true,
    "unique": true
  },
  "image" : String,
  "url" : String
});


let propertySchema = new mongoose.Schema({
  "name" : {
    "type": String,
    "required": true,
    "unique": true
  },
  "type" : {
    "type": String,
    "enum": ["value", "multiSelect", "select"],
    "required": true
  },
  "title" : {
    "en" : String
  },
  "active" : Boolean,
  "values" : [ValueSchema],
  "isSystem" : Boolean,
  "tags" : Array,
  "url" : String
});

module.exports = mongoose.model("properties", propertySchema);
