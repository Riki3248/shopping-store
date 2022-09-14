const exp = require('express');
// const { JsonWebTokenError } = require('jsonwebtoken');
const router = exp.Router()
const Users = require('../BL/user.BL');
const user = require('../models/usersSchema');
const jwt = require('jsonwebtoken')
const Role = require('./rols')
console.log("succseful users");
const accessTokenSecret = "somerandomaccesstoken";

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, accessTokenSecret, (err, uesr) => {
            if (err) {
                return res.sendStatus(403);

            }
            res.user = user
            next()
        })


    } else {
        res.sendStatus(401);
    }
}

// const authorize=(rolse)=>{

// if(rolse!="user"&&rolse!="admin"){
// return res.sendStatus(401).json({ message: 'Invalid authorization' });
// }
// if(roles=="admin"){

// }
// }

function authorize(roles = []) {
    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return [
        // authenticate JWT token and attach user to request object (req.user)
        // jwt({ secret, algorithms: ['HS256'] }),

        // authorize based on user role
        (req, res, next) => {
            if (roles.length && !roles.includes(req.user.role)) {
                // user's role is not authorized
                return res.status(401).json({ message: 'Unauthorized' });
            }

            // authentication and authorization successful
            next();
        }
    ];
}





router.
    get('/',
    //authenticateJWT,
    //  authorize(Role.Admin)  ,
        (req, res) => {
            console.log("hello");
            Users.getAllUsers()
                .then(data => res.json(data))

        })

router.get('/:password', (req, res) => {
    let password = req.params.password
    console.log("password", password);
    Users.getUsersByPassword(password).then(data => res.json(data))

})

router.post('/',
// authenticateJWT, 
(req, res) => {
    console.log("req.body");
    let body = req.body
    console.log("body");
    Users.addUsers(body).then(data => res.json(data))
})

router.put("/:password", (req, res) => {
    console.log("password", req.params.password);
    let password = req.params.password
    let obj = req.body
    Users.updateUsers(password, obj).then(data => res.json(data))
})

router.delete('/:password', (req, res) => {
    console.log("deleta");
    let password = req.params.password

    Users.deliteUsers(password).then(data => res.json(data))

})
router.route('/login')
    .post((req, res) => {
        const email = req.body.email;
        const password = req.body.password

        Users.login(email).then(data => { return res.json(data) }).catch(err => res.status(401))
    })
module.exports = router

