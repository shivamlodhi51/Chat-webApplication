const router = require("express").Router();
const { user, Deletuser, allUsers, userRegister, getUser, userLogin } = require("../Controllers/userController");
const { authMiddleware } = require("../middleware/authMiddleware");
// const validate = require('../middleWare/validation_middleware');
// const registerValidation = require('../middleWare/validation');

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get('/user', authMiddleware, user);
router.get('/alluser', allUsers);
router.get('/getuser/:userId', getUser);
router.delete('/deleteuser/:userId', Deletuser);

module.exports = router;