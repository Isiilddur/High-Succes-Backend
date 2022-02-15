const express = require('express')
const router = express.Router();

router.use(require('./products.routes'))
router.use(require('./orders.routes'))
//router.use(require('./admin.routes'))*/
router.use(require('./category.routes'))


module.exports = router;
