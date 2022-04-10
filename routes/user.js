const router = require("express").Router();
const {
  getAllUsers,
  getUserById,
  createNewUser,
  updateUser,
  updateAvatar,
} = require("../controllers/user");

router.get("/", getAllUsers);
router.get("/:userId", getUserById);
router.post("/", createNewUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
