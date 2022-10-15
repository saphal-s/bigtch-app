const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    introduction: {
        type: String,
        required: true,
    },
    specification: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: ''
    },
    category: {
        type: ObjectId,
        ref: 'Category'
    },
    isFeatured: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

productSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

productSchema.set('toJSON', {
    virtuals: true,
});


module.exports = mongoose.model('Product', productSchema);