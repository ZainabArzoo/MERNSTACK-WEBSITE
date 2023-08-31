const app = require('express')
const router = app.Router()

const { DemoMail,AddOrder,AllOrders,OrderById,UpdateOrder } = require('./controller')

router.post('/sendemail',DemoMail)
router.post('/addorder',AddOrder)
router.get('/allorders',AllOrders)
router.get('/orderbyid/:_id',OrderById)
router.put('/updateorder',UpdateOrder)



module.exports = router