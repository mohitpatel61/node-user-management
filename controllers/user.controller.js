// controllers/user.controller.js
const User = require('../models/user.model');
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });


exports.getAllUsers = async (req, res) => {
  try {
    // Get query params for pagination
    const { page = 1, pageSize = 10 } = req.query; // Default to page 1 and pageSize 10

    // Fetch users with pagination
    const users = await User.findAll(page, pageSize);

    console.log("Fetched users:", users); // Log fetched users

    // Send the users as a response
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error); // Log error for debugging
    res.status(500).json({ message: error.message });
  }
};




exports.checkEmailExists = async (req, res) => {
  try {
    const email = req.params.email; // Access email from route parameter
    // console.log("email",email);return false;
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    const user = await User.findByEmail(email);
    // console.log("emaiuserl",user);return false;
    res.json({ exists: !!user });
  } catch (error) {
    console.error('Error checking email:', error);
    res.status(500).json({ message: 'Server error while checking email' });
  }
};



exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({ message: 'User created', newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const baseUrl = `${req.protocol}://${req.get('host')}`;

    // Add the full URL of the profile picture to the user object
    if (user.image) {
      // Assuming 'image' field contains the filename
      user.profilePicture = `${baseUrl}/${user.image}`;
    } else {
      // Default fallback image if no profile picture is found
      user.profilePicture = ''; 
    }

    // Send back the updated user object with profile picture URL
    
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.loginUser = async (req, res) => {
  try {
    const loginUser = await User.checkLoginData(req.body);
    if (!loginUser) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    res.status(200).json({ id: loginUser.id, name: loginUser.firstName });
  } catch (error) {
    res.status(500).json({ message: 'An internal error occurred' });
  }
};


exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.update(req.params.id, req.body);
    res.status(200).json({ message: 'User updated', updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.delete(req.params.id);
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  };

};



exports.updateUserProfileImage = async (req, res) => {
  try {
    const userId = req.params.id;
    const profilePicturePath = req.file ? req.file.path : null;

    if (!profilePicturePath) {
      return res.status(400).json({ message: 'Profile picture is required' });
    }

    // Update user record with the image path
    const updatedUser = await User.updateUserProfileImage(userId, { image: profilePicturePath });

    // Generate dynamic base URL for the profile picture
    const baseUrl = `${req.protocol}://${req.get('host')}`;

    // Add the full URL of the profile picture to the updatedUser object
 
      updatedUser.profilePicture = `${baseUrl}/${profilePicturePath}`;
   
    // Return the updated user along with the profile picture URL
    res.status(200).json({
      code: '200',
      message: 'Profile picture uploaded successfully',
      updatedUser
    });
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    res.status(500).json({
      code: '500',
      message: 'An error occurred during the upload'
    });
  }
};



