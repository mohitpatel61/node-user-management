const express = require('express');
const multer = require('multer');
// const upload = multer({ dest: 'uploads/' }); // Adjust destination as needed
const upload = require('../middlewares/upload'); // Import multer configuration

const router = express.Router();
const userController = require('../controllers/user.controller');

// Route to check if email exists
router.get('/check-email/:email', userController.checkEmailExists);

// Route to log in a user
router.post('/login', userController.loginUser);

// Route to get all users with pagination
// Accepts query params 'page' and 'pageSize' for pagination
router.get('/', userController.getAllUsers);

// Route to create a new user
router.post('/', userController.createUser);

// Route to get a user by ID
router.get('/:id', userController.getUserById);

// Route to update a user by ID
router.put('/:id', userController.updateUser);

// Route to delete a user by ID
router.delete('/:id', userController.deleteUser);

//Update user Profile image
// router.put(
//     '/uploadProfilePicture/:id',
//     upload.single('profilePicture'), // Middleware for handling file upload
//     userController.updateUserProfileImage
//   );

  router.put('/uploadProfilePicture/:id', upload.single('profilePicture'), userController.updateUserProfileImage);


module.exports = router;
