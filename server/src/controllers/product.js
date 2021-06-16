const { product } = require('../../models')

exports.addProduct = async (req, res) => {
    try {
        const data = req.body;
        const image = req.files.imageFile[0].filename

        const dataUpload = {
            ...data,
            image
        }

        await product.create(dataUpload)

        res.send({
            status: "success",
            message: "Upload product data success"
        })

    } catch (error) {
        console.log(error)
        res.status({
            status: 'failed',
            message: 'Server Error',
        })
    }
}

exports.getProducts = async (req, res) => {
    try {
        const path = process.env.PATH_UPLOAD
        let data = await product.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })

        const parseJSON = JSON.parse(JSON.stringify(data))

        data = parseJSON.map(item => {
            return {
                ...item,
                image: path + item.image
            }
        })

        res.send({
            status: "success",
            message: "Get product data success",
            data: {
                products: data
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

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params

        await product.destroy({
            where: {
                id
            }
        })

        res.send({
            status: "success",
            message: "Delete product data success",
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