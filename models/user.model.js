// models/user.model.js
const db = require('../config/db.config');

const User = {
  // Fetch all Users
  // models/user.model.js

// Function to get users with pagination
findAll :async (page = 1, pageSize = 10) => {
  const connection = await db();

  // Ensure page and pageSize are integers
  page = parseInt(page, 10);
  pageSize = parseInt(pageSize, 10);

  // Calculate the offset based on the current page and page size
  const offset = (page - 1) * pageSize;

  // Query to get the users with LIMIT and OFFSET for pagination
  const query = 'SELECT * FROM Users LIMIT ? OFFSET ?';
  const [rows] = await connection.query(query, [pageSize, offset]);

  // Query to get the total count of users for pagination
  const countQuery = 'SELECT COUNT(*) AS total FROM Users';
  const [countResult] = await connection.query(countQuery);

  // Extract total record count from the result
  const totalRecords = countResult[0].total;

  return { users: rows, totalRecords }; // Return both users and total record count
},


  findByEmail: async (email) => {
    const connection = await db();
    const [rows] = await connection.query('SELECT * FROM Users WHERE email = ?', [email]);
    return rows[0]; // Return the user if found, otherwise undefined
  },


  // Create a new user
  create: async (userData) => {
    const connection = await db();
    // console.log("userData.email",userData.email);return false;
    const [result] = await connection.query('INSERT INTO Users SET ?', userData);
    return result;
  },

  // Fetch user by ID
  findById: async (id) => {
    const connection = await db();
    const [rows] = await connection.query('SELECT * FROM Users WHERE id = ?', [id]);
    return rows[0];
  },

  // Get and validate user login
  // checkLoginData: async (req) => {
  //   const connection = await db();
  //   const [rows] = await connection.query('SELECT * FROM Users WHERE email = ? and password = ?', [req.email, req.password]);
  //   return rows[0];
  // },


checkLoginData: async (req) => {
  const connection = await db();
  const [rows] = await connection.query('SELECT * FROM Users WHERE email = ? and password = ?', [req.email, req.password]);
  const user = rows[0];
  if (user) {
    return user;
  }
  return null; // Return null if authentication fails
},



  // Update user by ID
  update: async (id, userData) => {
    const connection = await db();
    const [result] = await connection.query('UPDATE Users SET ? WHERE id = ?', [userData, id]);
    return result;
  },

  // Delete user by ID
  delete: async (id) => {
    const connection = await db();
    const [result] = await connection.query('DELETE FROM Users WHERE id = ?', [id]);
    return result;
  },

  // Update userImage by ID
  updateUserProfileImage: async (id, userData) => {
    const connection = await db(); // Assuming db() is a function that returns a MySQL connection

      // Update the user's image in the database
      const [result] = await connection.query('UPDATE Users SET ? WHERE id = ?', [userData, id]);
      return result;
  
}

}
module.exports = User;
