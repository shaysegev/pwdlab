const mongoose = require('mongoose');
const _ = require('lodash');
const cryptLib = require('../lib/crypt');

const RecordSchema = mongoose.Schema({
  rid: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  url: {
    type: String,
  },
  login: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  }
});

/**
 * Allowed JSON object to return to frontend
 */
RecordSchema.methods.toJSON = function() {
  const record = this;
  const recordObject = record.toObject();

  return _.omit(recordObject, ['rid']);
};

/**
 * Creating and populating the record id field
 * 
 * @param object user
 */
RecordSchema.methods.createRecordId = function (user) {
  const record = this;
  record.rid = cryptLib.getRecordId(user);
};

RecordSchema.pre('save', function (next) {
  let record = this;
  Object.keys(record.toJSON()).filter((key) => {
    if (key === '_id' || key === 'rid') {
      return;
    }

    if (record.isModified(key)) {
      record[key] = cryptLib.privateEncrypt(record[key]);
    }
  })
  next();
});

RecordSchema.pre('findOneAndUpdate', function () {
  let record = this;
  let recordValues = record._update.$set;
  Object.keys(recordValues).filter((key, val) => {
    if (key === '_id' || key === 'rid') {
      return;
    }

    // Encrypting old/new values
    recordValues[key] = cryptLib.privateEncrypt(recordValues[key]);
  })

  this.update({},{ $set: recordValues });
});


const Crypt = mongoose.model('Records', RecordSchema);

module.exports = Crypt