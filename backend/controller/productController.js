const Product = require("../models/Product");

exports.create = async (req, res) => {
    try {
        const { name, introduction, specification, category, isFeatured } = req.body;

        const product = await new Product({
            name, introduction, specification, category,
            isFeatured
        })
        if (req.file) {
            product.image = req.file.path
        }
        product.save();
        res.status(200).json({ msg: 'Procuct created succesfully', product })
    } catch (error) {
        console.log(error)
        res.status(400).send('Product create faild!');
    }
}

exports.list = async (req, res) => {
    let filter = {};
    if (req.query.categories) {
        filter = { category: req.query.categories.split(',') }
    }
    try {
        const response = await Product.find(filter).sort({ updatedAt: -1 }).populate('category')
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({ errors: error, msg: error.message })
    }
}

exports.read = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await Product.findOne({ _id: id }).populate('category');
        return res.status(200).json({ response: response });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error, msg: error.message })
    }
}

exports.update = async (req, res) => {
    try {

        const updated = await
            Product.findOneAndUpdate({
                id: req.params.id
            },
                req.body,
                { new: true }).exec();
        res.json(updated);
    } catch (err) {
        console.log('product update error', err);
        return res.status(400).send('product update failed');
    }
}


exports.getCount = async (req, res) => {

    const productCount = await Product.countDocuments();

    if (!productCount) {
        res.status(500).json({ success: false })
    }
    res.send({
        productCount: productCount
    })
}

exports.getFeatured = async (req, res) => {
    const products = await Product.find({ isFeatured: true });

    if (!products) {
        res.status(500).json({ success: false })
    }
    res.send({
        products: products
    })
}

