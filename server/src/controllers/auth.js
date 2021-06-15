const { user } = require('../../models')
const joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.registrasi = async (req,res) => {
    try {
    
    const { email, password } = req.body
    const data = req.body

    const schema = joi.object({
        username: joi.string().min(6).required(),
        fullname: joi.string().min(6).required(),
        email: joi.string().email().min(8).required(),
        password: joi.string().min(8).required()
    })

    const { error } = schema.validate(data)

    if(error){
        return res.send({
            status: 'Validation Failed',
            message: error.details[0].message
        })
    }

    const checkEmail =  await user.findOne({
        where: {
            email
        }
    })

    if(checkEmail){
        return res.send({
            status: 'Failed',
            message: 'Email Already Registered'
        })
    }

    const hashStrenght = 10
    const hashedPassword = await bcrypt.hash(password, hashStrenght)

    const dataUser = await user.create({
        ...data,
        password: hashedPassword
    })

    res.send({
        status: 'succes',
        data: {
            user: {
                username: dataUser.username,
                email: dataUser.email
            }
        }
    })
        
    } catch (error) {
        console.log(error)
        res.status({
            status: 'failed',
            message: 'Server Error',
        })
    }
}

exports.login = async (req,res) => {
    try {
    
    const { email, password } = req.body
    const data = req.body

    const schema = joi.object({
        email: joi.string().email().min(8).required(),
        password: joi.string().min(8).required()
    })

    const { error } = schema.validate(data)

    if(error){
        return res.send({
            status: 'Validation Failed',
            message: error.details[0].message
        })
    }

    const checkEmail =  await user.findOne({
        where: {
            email
        }
    })

    if(!checkEmail){
        return res.send({
            status: 'Failed',
            message: "Email and Password don't match"
        })
    }

    const isValidPassword = await bcrypt.compare(password, checkEmail.password)

    if(!isValidPassword){
        return res.send({
            status: 'Failed',
            message: "Email and Password don't match"
        })
    }
    
    const secretKey = process.env.SECRET_KEY

    // return res.send({
    //     secret: process.env.SECRET_KEY
    // })

    const token = jwt.sign({
        id: checkEmail.id
    },secretKey)


    res.send({
        status: 'success',
        data: {
            user: {
                username: checkEmail.username,
                email: checkEmail.email,
                token
            }
        }
    })
        
    } catch (error) {
        console.log(error)
        res.status({
            status: 'failed',
            message: 'Server Error',
        })
    }
}

exports.checkAuth = async (req,res) => {
    try {

        const id = req.idUser

        const dataUser = await user.findOne({
            where: {
                id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password']
            }
        })
    
        if(!dataUser){
            return res.status(404).send({
                status: 'failed'
            })
        }


        res.send({
            status: 'success',
            data: {
                user: {
                    username: dataUser.username,
                    email: dataUser.email
                }
            }
        })
        
    } catch (error) {
        console.log(error)
        res.status({
            status: 'failed',
            message: 'Server Error',
        })
    }
}

