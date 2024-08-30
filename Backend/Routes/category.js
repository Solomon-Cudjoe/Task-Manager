const router = require('express').Router();
const { getAll } = require("../Controllers/category");


router.get('/', getAll);


module.exports  = router