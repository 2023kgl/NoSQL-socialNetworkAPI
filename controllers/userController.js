const { User } = require('../models');

const UserController = {

  // Get all users
  async getAllUsers(req, res) {
    try {
      const userData = await User.find({});
      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  

  // grabs 1 user by id
  async getUserById(req, res) {
    try {
      const userData = await User.findById(req.params.userId);
      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  
  // create a user
  async createUser(req, res) {
    try {
      const userData = await User.create(req.body);
      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  // find and update user id 
  async updateUserById(req, res) {
    try {
      const userData = await User.findOneAndUpdate(req.params.id, req.body, { new: true });
      if (!userData) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  // find and delete user by id 
  async deleteUserById(req, res) {
    try {
      const userData = await User.findOneAndDelete(req.params.id);
      if (!userData) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  // adds friend to friends array for specific user id 
  async addFriend(req, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.body.friendId || req.params.friendId } },
        { new: true }
      );
      if (!userData) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  // remove friend from friends arrays
  async removeFriend(req, res) {
    try {
      const dbUserData = await User.findOneAndUpdate(
        { _id: req.params.userId },
      // removes freind id from friends array from userid
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
  
      if (!dbUserData) {
        return res.status(404).json({ message: "No user with this id!" });
      }
  
      // Check if friend was removed from friends array
      const removed = !dbUserData.friends.includes(req.params.friendId);
  
      if (removed) {
        res.json({ message: "Friend removed successfully!", dbUserData });
      } else {
        res.json(dbUserData);
      }

    } catch (err) {
      res.status(400).json(err);
    }
  }

};

// Export UserController
module.exports = UserController;