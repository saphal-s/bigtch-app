const mongoose = require('mongoose');

const complainSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    product: {
        type: String,
        required: true,
    },
    branch: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    complainStatus: {
        type: String,
        default: "Not Processed",
        enum: [
            "Not Processed",
            "Sent To Branch",
            "Solvend",
        ]
    },
    image: {
        type: String,
        default: ''
    },
    isView: {
        type: Boolean,
        default: false
    },
    isSolved: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

complainSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

complainSchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('Complain', complainSchema);
