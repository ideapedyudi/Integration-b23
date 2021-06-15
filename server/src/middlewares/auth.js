const jwt = require('jsonwebtoken')

exports.auth = (req, res, next) => {
    try {
        
        let header = req.header("Authorization")

        if(!header){
            return res.send({
                status: 'Failed',
                message: 'Access Failed'
            })
        }

        let token = header.replace("Bearer ", "")

        const secretKey = process.env.SECRET_KEY

        const verified = jwt.verify(token, secretKey)

        req.idUser = verified.id

        next()

    } catch (error) {
        console.log(error)
        res.status({
            status: 'failed',
            message: 'Server Error',
        })
    }
}