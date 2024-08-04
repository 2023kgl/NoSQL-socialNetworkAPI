const { Thought, Reaction } = require('../models');
// const {Types} = require('mongoose');

// ThoughtController object 
const ThoughtController = {

// grabs all thought documents from MongoDB collection
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find({});
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

// grabs a single thought document from MongoDB collection by using thoughtId
  async getThoughtsById(req, res) {
    try {
      const thought = await Thought.findOne({_id:req.params.thoughtId});
      if (!thought) {
        res.status(404).json({ message: 'Thought not found' });
      } else {
        res.json(thought);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

// create new thought document 
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.status(201).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
// deletes thought by finding id then deleting
  async deleteThought(req,res) {
    try {
        const thought = await Thought.findByIdAndDelete({_id:req.params.thoughtId});
        res.status(200).json({ message : 'Thought deleted' });
    } catch (err) {
        res.status(500).json(err);
    }
  },

// updates thought by finding by id then updating 
// new: true  returns updated document
  async updateThoughtById(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, {
        new: true,
      });
        res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

// finds thought by id and updates by adding new reaction
  async createReaction(req, res) {
      try {
        const thought = await Thought.findOneAndUpdate(
          { _id : req.params.thoughtId },
          // adds reaction
          { $addToSet : {reactions: req.body} },
          // validates schema and new:true returns the updated doc
          { runValidators : true, new: true }
        );
        console.log(thought)
        res.status(200).json(thought) 
    } catch (err) {
        res.status(500).json(err);
    }
  },

// remove reaction by using it's id and the thought id
  async deleteReaction(req, res) {
      try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
          // pulls reaction out from the reaction array in specific thought id
            { $pull: {reactions: {reactionId: req.params.reactionId} } },
          // validates schema and new:true returns updated doc
            { runValidators: true, new: true }
        );
        res.status(200).json(thought)
    } catch (err) {
        res.status(500).json(err);
    }
  },

};

// Export ThoughtController
module.exports = ThoughtController;