const { Schema, model} = require("mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    cart: {
        items: [
            {
                count: {
                    type: Number,
                    required: true,
                    default: 1,
                },
                notebookId: {
                    type: Schema.Types.ObjectId,
                    ref: "Notebook",
                    required: true,
                }
            }
        ]
    }
});

userSchema.methods.addToCart = function ( notebook ) {
    let items = [...this.cart.items];
    const index = items.findIndex(s => {
        return s.notebookId.toString() === notebook._id.toString()
    });

    if (index >= 0) {
        items[index].count = items[index].count + 1;
    } else {
        items.push({
            notebookId: notebook._id,
            count: 1,
        });
    }

    this.cart = { items };
    return this.save();
}
module.exports = model("User", userSchema);