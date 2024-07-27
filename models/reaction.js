const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
    // automatically generates a new object id if one is not provided
      default: () => new Types.ObjectId(),
    },

    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },

    username: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
    // sets the default value to the current date and time
      default: Date.now,
    // getter function - formats date so it's readable
      get: timestamp => new Date(timestamp).toLocaleDateString()
    },

  },

  {
  // this allows custom formatting of the fields used, applies the getter function
    toJSON: {
      getters: true,
    },
  // mongoose schema automatic default is to automatically add id, but when set to false it's disables the default, no creating an id
    id: false,
  }
);

module.exports = reactionSchema