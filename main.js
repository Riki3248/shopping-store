const exp=require('express')
const app=exp()
const productRouter=require('./router/products')
const usersRouter=require('./router/users')
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const Users = require('./BL/user.BL');
const cors=require('cors')
// const {initialize}=require('express-openapi')
const mongoose=require('mongoose')

console.log("hi");
app.use(
    '/api-docs',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
  );
async function main(){
    await mongoose.connect('mongodb://localhost:27017/store') 
 }
 main().then(_=>{
    console.log('connection');
    app.listen(8000,_=>console.log('http://localhost:8000'))
   
 }).catch(err=>{
     console.log(err);
 })
//  initialize({
//     app,
//     apiDoc: require("./api/api-doc"),
//     paths: "./api/paths",
//   });
// app.use('/doc',swaggerUi.serve,swaggerUi.setup(swaggerDocument))

// app.
// get('/users', (req, res) => {
//     console.log("hello");
//     Users.getAllUsers = () => {
//         console.log("jjjjjjjjjjjjjjjjjj")
     
//             // resolve("all")
//         } 
// })



app.use(exp.json()) 
app.use(exp.urlencoded({extended: true}));

app.use(cors({origin:'http://localhost:3000'}))

app.use('/users',usersRouter)

app.use('/products',productRouter)
