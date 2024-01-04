const Product_SellerCompany = require('../models/product_sellerCompany.model')
const SellerCompany = require('../models/sellerCompany.model')
const Product = require('../models/product.model')


const getAllProductSellerCompanies = async (req, res) => {

    try {

        const productSellerCompany = await Product_SellerCompany.findAll({

            where: req.query,
            include: [{
                model: SellerCompany,
                attributes: ['name'] // Atributos a seleccionar del modelo SellerCompany
            },
            {
                model: Product,
                attributes: ['name', 'model', 'brand'] // Atributos a seleccionar del modelo Product
            }]

        })

        if (productSellerCompany) {
            return res.status(200).json(productSellerCompany)
        }
        else {
            return res.status(400).send("Product-SellerCompany Not Found")
        }

    } catch (error) {

        res.status(500).json({ message: error.message })

    }

}

const createProductSellerCompany = async (req, res) => {

    try {

        const productSellerCompany = await Product_SellerCompany.create(req.body)

        if (productSellerCompany) {

            return res.status(200).json(productSellerCompany)

        }
        else {

            return res.status(400).send("ProductSellerCompany couldnt be created.")

        }

    } catch (error) {

        res.status(500).json({ message: error.message })

    }

}

const updateProductSellerCompany = async (req, res) => {

    try {

        const [productSellerCompany] = await Product_SellerCompany.update(req.body, {
            where: {
                id: req.params.productSellerCompanyId
            }
        })
        if (productSellerCompany) {
            return res.status(200).json(productSellerCompany)
        }
        else {
            return res.status(400).send("ProductSellerCompany couldnt be updated.")
        }

    } catch (error) {

        return res.status(500).send({ message: error.message })

    }

}

const deleteProductSellerCompany = async (req, res) => {

    try {

        const productSellerCompany = await Product_SellerCompany.destroy({
            where: {
                id: req.params.productSellerCompanyId
            }
        })
        if (productSellerCompany) {
            return res.status(200).json("Product-SellerCompany was deleted Successfully.")
        }
        else {
            return res.status(400).send("Product-SellerCompany couldnt be deleted.")
        }

    } catch (error) {

        return res.status(500).send({ message: error.message })

    }

}


// Specific EndPoints 


module.exports = {

    getAllProductSellerCompanies,
    createProductSellerCompany,
    updateProductSellerCompany,
    deleteProductSellerCompany,

}