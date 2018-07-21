const router = require('express').Router();
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

    await record.save();
    res.send({success: true});
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
  // todo verify user with rid before proceeding
})

module.exports = router;
