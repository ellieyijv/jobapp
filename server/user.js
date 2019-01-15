const express = require('express')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const utils = require('utility')
const _filter = {'pwd': 0 , '__v':0}

Router.get('/list', function (req, res) {
    const {type} = req.query
  /*  User.remove({}, function (err,doc) {
        
    })*/
    User.find({type}, function (err, doc) {
        return res.json({code:0, data:doc})
    })
})

Router.post('/register', function (req, res) {

    const {user, pwd, type} = req.body
    User.findOne({user}, function (err, doc) {
        if(doc) {
            return res.json({code:1, msg:'duplicated user name'})
        }
        const userModel = new User({user,type, pwd:newPwd(pwd)})
        userModel.save(function (err, doc) {
            if(err)
            {
                return  res.json({code:1, msg:'something wrong with the server'})
            }
            const {user, type, _id} = doc
            res.cookie('userid', _id)
            return res.json({code:0, data: {user, type, _id}})
        })


    })
})

Router.post('/update', function (req,res) {
    const userid = req.cookies.userid
    if(!userid){
        return json.dumps({code:1})
    }
    const body = req.body
    User.findByIdAndUpdate(userid, body,function (err,doc) {
        const data = Object.assign({},{
            user:doc.user,
            type:doc.type},body)
        return res.json({code:0,data})
        })
})


Router.post('/login', function (req, res) {
    const {user, pwd} = req.body
    User.findOne({user, pwd:newPwd(pwd)},_filter, function(err, doc){
        if(!doc){
            return res.json({code:1, msg:'user name or password is wrong'})
        }
        res.cookie('userid', doc._id)
        return res.json({code:0, data:doc})
    })
})

Router.get('/info', function (req, res) {
    const {userid} = req.cookies
    if(!userid){
        return res.json({code:1})
    }
    User.findOne({_id:userid}, _filter, function (err, doc) {
        if(err) {
            return res.json({code:1, msg:'Something wrong with the server'})
        }
        if(doc){
            return res.json({code:0, data:doc})
        }
    })
})

function newPwd(pwd){
   const salt = 'safe_for_the@password!&%'
    return utils.md5(utils.md5(pwd +salt))
}
module.exports = Router