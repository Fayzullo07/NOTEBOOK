const { Schema, model } = require("mongoose");

const notebook = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    descr: {
        type: String,
        required: true
    }
});

module.exports = model("Notebook", notebook);