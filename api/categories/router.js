const app = require('express')
const router = app.Router()
const { AddCategory,AllCategories,CategoryById,CategoryByName,UpdateCategory,DeleteCategory } = require('./controller')


router.post('/addcategory', AddCategory)
router.get('/allcategories', AllCategories)
router.get('/categorybyid/:_id', CategoryById)
router.get('/categorybyname/:Category', CategoryByName)
router.put('/updatecategory', UpdateCategory)
router.delete('/deletecategory', DeleteCategory)



module.exports = router