
const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        trim: true,
    }
}, { timestamps: true });

categorySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

categorySchema.set('toJSON', {
    virtuals: true,
});


module.exports = model('Category', categorySchema)