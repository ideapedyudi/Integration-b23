const { user } = require('../../models')

exports.getUsers = async (req,res) => {
    try {
        const users = await user.findAll({
            attributes: {
              exclude: ['createdAt','updatedAt','password']
            }
          })

        res.send({
            status: 'success',
            message: 'User Successfully Get',
            data: {
                users
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

exports.getUser = async (req,res) => {
    try {

        const { id } = req.params

        const userData = await user.findOne({
            attributes: {
              exclude: ['createdAt','updatedAt','password']
            },
            where: {
                id
            }
          })

        res.send({
            status: 'success',
            message: 'User Successfully Get Detail',
            data: {
                user: userData
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

exports.addUser = async (req,res) => {
    try {
        const { body } = req

        await user.create(body)

        res.send({
            status: 'success',
            message: 'User Successfully Add'
        })

    } catch (error) {
        console.log(error)
        res.status({
            status: 'failed',
            message: 'Server Error',
        })
    }
}

exports.updateUser = async (req,res) => {
    try {
        const { id } = req.params
        const { body } = req

        const checkId = await user.findOne({
            where: {
                id
            }
        })

        // check id user
        if(!checkId){
            return res.send({
                status: 'failed',
                message: `User with id: ${id} not found`
            })
        }

        // Proses update
        await user.update(body,
            {
                where: {
                    id
                }
            })
        
        const dataUpdate = await user.findOne(
            {
                attributes: {
                    exclude: ['createdAt','updatedAt','password']
                },
                where: {
                    id
                }
            })
        
        res.send({
            status: 'success',
            message: 'User Successfully Add',
            data : {
                user: dataUpdate
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

exports.deleteUser = async (req,res) =>{
    try {
        const { id } = req.params

        await user.destroy({
            where: {
                id
            }
        })

        res.send({
            status: 'success',
            message: 'User successfully Delete',
            data: {
                id
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