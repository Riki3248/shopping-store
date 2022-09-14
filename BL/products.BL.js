const product_Model = require('../models/productschema')

const getAllProducts = () => {
    return new Promise((resolve) => {
        product_Model.find({}, { _id: 0, __v: 0 }, (err, data) => {
            if (err) {
                throw err
            }
            else {
                resolve(data)
            }
            console.log(data);
        })
        // resolve("all")
    })
}
const getProductsById = (id) => {
    console.log(id);
    return new Promise((resolve) => {

        product_Model.find({ id }, {_id: 0, __v: 0}, (err, data) => {

            if (err) {
                throw err
            }
            else {
                resolve(data)
            }
            console.log(data);
        });
        // resolve("ProductsById")
    })
}

const addProducts = (obj) => {
    return new Promise((resolve, reject) => {
        let add = new product_Model({
            name: obj.name,
            price: obj.price,
            id: obj.id,
            descripation: obj.descripation

        })
        add.save()
        // resolve("the product was added")
    })

}
const updateProducts = (id, obj) => {
console.log(obj,"obj");
    return new Promise((resolve,reject) => {
        product_Model.update({id},
            {
            name: obj.name,
            price: obj.price,
            id: obj.id,
            descripation: obj.descripation
        }
        , (err, data) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(data)
               
            }

        })
       
    })
}

const deliteProducts = (id) => {
    console.log(id);
    return new Promise((resolve) => {
        product_Model.remove({id}, (err, data) => {
            if (err) {
                return err
            }
            else {
                resolve(data)
            }
        })
    })
}

module.exports = { getAllProducts, getProductsById, addProducts, updateProducts, deliteProducts }