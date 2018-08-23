const router = require('express').Router();
const { ObjectID } = require('mongodb');
const authenticate = require('../../middleware/authenticate');
const cryptLib = require('../../lib/crypt');
const Record = require('../../models/records');
const logger = require('../../logger');

router.post('/', authenticate, async (req, res) => {
  try {
    let body = cryptLib.decrypt(req.body._);
    body = JSON.parse(body);

    let record = new Record(body);
    record.createRecordId(req.user);

    record = await record.save();
    res.send({success: true, recordId: record._id});
  } catch (e) {
    const msg = `Could not save new record`;
    if (process.env.NODE_ENV === 'development') {
      console.log(e)
    }
    logger.error(msg);
    res.status(500).send({success: false, msg});
  }
})

router.get('/', authenticate, async (req, res) => {
  // Getting the user unique Record id for fetching records
  const rid = cryptLib.getRecordId(req.user._id, req.user.salt)
  const records = await Record.find({ rid })
  if (records) {
    res.send({success: true, records})
  }

});


router.put('/:id', authenticate, async (req, res) => {
  try {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }

    let body = cryptLib.decrypt(req.body._);
    body = JSON.parse(body);

    // Getting the user's unique record Id
    const rid = cryptLib.getRecordId(req.user._id, req.user.salt)

    const recordFoundAndUpdated = await Record.findOneAndUpdate(
      {_id: id, rid},
      {$set: body}
    );
    if (!recordFoundAndUpdated) {
      res.status(404).send();
    }

    res.send({success: true});
  } catch (e) {
    const msg = `Could not update record`;
    if (process.env.NODE_ENV === 'development') {
      console.log(e)
    }
    logger.error(msg);
    res.status(500).send({success: false, msg});
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  try {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }
    // Getting the user's unique record Id
    const rid = cryptLib.getRecordId(req.user._id, req.user.salt)

    const recordFoundAndDeleted = await Record.findOneAndRemove({ _id: id, rid });
    if (!recordFoundAndDeleted) {
      return res.status(404).send();
    }

    res.send({success: true});
  } catch (e) {
    res.status(400).send();
  }
})

module.exports = router;
