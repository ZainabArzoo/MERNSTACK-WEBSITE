const app = require('express')
const router = app.Router()
const { AddBrand,AllBrands,BrandById,BrandByName,UpdateBrand,DeleteBrand } = require('./controller')


router.post('/addbrand', AddBrand)
router.get('/allbrands', AllBrands)
router.get('/brandbyid/:_id', BrandById)
router.get('/brandbyname/:brand', BrandByName)
router.put('/updatebrand', UpdateBrand)
router.delete('/deletebrand', DeleteBrand)



module.exports = router
