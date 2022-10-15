const Complain = require("../models/Complain");

exports.create = async (req, res) => {
    try {
        const { name, email, phone, address, product, branch, message } = req.body;
        const response = await new Complain({
            name, email, phone, address, product, branch, message
        })
        if (req.file) {
            response.image = req.file.path
        }
        response.save();
        res.status(200).json({ msg: 'Complain sent succesfully', response })
    } catch (error) {
        console.log(error)
        res.status(400).send('Complain create faild!');
    }
}

exports.list = async (req, res) => {
    try {
        const response = await Complain.find().sort({ updatedAt: -1 })
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({ errors: error, msg: error.message })
    }
}

// exports.read = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const response = await Complain.findOne({ _id: id });
//         return res.status(200).json({ response: response });
//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({ error: error, msg: error.message })
//     }
// }

exports.update = async (req, res) => {
    const { isView } = req.body;
    try {
        const updated = await Complain.findOneAndUpdate(
            { id: req.params.id },
            { isView })
        res.json(updated)
    } catch (err) {
        console.log(err)
        res.status(400).send("Complain update failed")
    }
}

// exports.remove = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const response = await Category.findByIdAndDelete(id);
//         return res.status(200).send('Category Deleted Successfully');
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ errors: error, msg: error.message })
//     }
// }