const router = require('express').Router()
const { addTask, editTask, getTasks, deleteTask, changeStatus, filterWithStatus, filterWithPriority } = require("../Controllers/task");


router.post("/:userId", addTask);

router.get("/:userId", getTasks);
router.get("/status/:userId/:status", filterWithStatus);
router.get("/priority/:userId/:priority", filterWithPriority);

router.put("/:userId/:taskId", editTask);
router.put("/status/:userId/:taskId", changeStatus);

router.delete("/:userId/:taskId", deleteTask);
module.exports = router;