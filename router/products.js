const exp = require('express')
const router = exp.Router()
const products = require('../BL/products.BL')



console.log("router");
router.get('/',  (req, res) => {
    console.log("hello");
 products.getAllProducts().then(data=>res.json(data))
    
})

router.get('/:id',  (req, res) => {
    let id = req.params.id
    console.log("id",id);
    products.getProductsById(id).then(data=>res.json(data))

})

router.post('/post', (req, res) => {
        console.log("req.body",req.body);
        let body = req.body
        console.log("body",body);
    products.addProducts(body).then(data=> res.json(data))    
    })

router.put("/:id",  (req, res) => {
    let id = req.params.id
    let obj = req.body
   products.updateProducts(id, obj).then(data=>res.json(data))
})

router.delete('/:id',  (req, res) => {
    console.log("deleta");
    let id = req.params.id

    products.deliteProducts(id).then(data=>res.json(data))

})

module.exports = router

