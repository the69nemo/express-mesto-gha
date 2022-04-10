const router = require('express').Router();
const { getAllUsers, getUserById, createNewUser} = require('../controllers/user');

router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.post('/', createNewUser);

module.exports = router;