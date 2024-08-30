const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
})

const Category = model("Category", categorySchema);

module.exports = Category;

async function createCategory() {
    mongoose.connect(process.env.DATABASE)
        .catch((err) => console.log('Error', err));

    
    const categories = [
        { name: "Work" },
        { name: "Personal" },
        { name: "Others" }
    ];

    for (const category of categories) {
        const exists = await Category.findOne({ name: category.name });
        if (!exists) {
            try {
                await Category.create(category);
            } catch (err) {
                console.log(err)
            }
        }
    }
}

createCategory().catch((e) => console.log(e));