const Category = require('../Models/category');

exports.getAll = async (req, res) => {
    try {
        const categories = await Category.find({});
        return res.status(200).json({ categories });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

