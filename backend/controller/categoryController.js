const Category = require("../models/Category");
var slugify = require('slugify');


exports.create = async (req, res) => {
    try {
        const { title } = req.body;
        const response = await new Category({
            title,
            slug: slugify(title),
        }).save();
        res.status(200).json({ msg: 'Category created succesfully', response })
    } catch (error) {
        console.log(error)
        res.status(400).send('Category create faild!');
    }
}

exports.list = async (req, res) => {
    try {
        const response = await Category.find().sort({ updatedAt: -1 })
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({ errors: error, msg: error.message })
    }
}

exports.read = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await Category.findOne({ _id: id });
        return res.status(200).json({ response: response });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error, msg: error.message })
    }
}

exports.update = async (req, res) => {
    const { title } = req.body;
    try {
        const updated = await Category.findOneAndUpdate(
            { id: req.params.id },
            { title, slug: slugify(title) },
            { new: true });
        res.json(updated)
    } catch (err) {
        console.log(err)
        res.status(400).send("Category update failed")
    }
}

exports.remove = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await Category.findByIdAndDelete(id);
        return res.status(200).send('Category Deleted Successfully');
    } catch (error) {
        console.log(error);
        return res.status(500).json({ errors: error, msg: error.message })
    }
}