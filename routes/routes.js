const express = require('express')
const router = express.Router();

router.use(require('./products.routes'))
/*router.use(require('./orders.routes'))
router.use(require('./admin.routes'))*/

module.exports = router;
