const users_Model = require('../models/usersSchema')
const jwt = require('jsonwebtoken')

const getAllUsers = () => {
    return new Promise((resolve) => {
        users_Model.find({}, { _id: 0, __v: 0 }, (err, data) => {
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
const getUsersByPassword = (password) => {
    console.log(password);
    return new Promise((resolve) => {

        users_Model.find({ password }, { _id: 0, __v: 0 }, (err, data) => {

            if (err) {
                throw err
            }
            else {
                resolve(data)
            }
            console.log(data);
        });
        // resolve("UserssBypassword")
    })
}

const addUsers = (obj) => {
    console.log("addeds");

    return new Promise(async (resolve, reject) => {

        const users = await getAllUsers().then(data => { return data }, (err, data) => {
            if (err) {
                reject("err")
            }

        })
        const email = users.find(u => { return u.email === obj.email || u.password === obj.password}, (__verr, data) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(data)
            }

        })
        if (!email) {
            let add = new users_Model({
                name: obj.name,
                password: obj.password,
                email: obj.email

            })
            add.save((err,data) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(data)
                }

            })
        }
        else
            resolve("error email or password exist")

    })

}
const updateUsers = (password, obj) => {
    console.log(obj, "obj");
    return new Promise((resolve, reject) => {
        users_Model.update({ password },
            {
                name: obj.name,
                password: obj.password,
                email: obj.email
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

const deliteUsers = (password) => {
    console.log(password);
    return new Promise((resolve) => {
        users_Model.remove({ password }, (err, data) => {
            if (err) {
                return err
            }
            else {
                resolve(data)
            }
        })
    })
}





 function login(email){
    console.log(email);
//     return new Promise(async(resolve,reject) => {
// const allusers=await this.getAllUsers().then(data=>{return data});
// console.log(users+"ppppppppppppppppppppppppppppppppppp");
// const user=allusers.find(u => { return u.email == email && u.password==password});
return new Promise(async(resolve,reject)=>{
    var users =await this.getAllUsers().then(data => {return data});
    var user =users.find(u => {return u.email == email});
console.log(user);

if(user){
    console.log("pppppppppppp");
    const accessTokenSecret="somerandomaccesstoken";
    let refreshToken=[]
const accessToken=jwt.sign({email:user.email},accessTokenSecret);
refreshToken.push(accessToken)  
resolve({accessToken})

}else{
    console.log("pppp88888888888888888888888888888ppppppppp");
    reject("email or password incorrect")
}
    })
}

module.exports = { getAllUsers, getUsersByPassword, addUsers, updateUsers, deliteUsers ,login}
