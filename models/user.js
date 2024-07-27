const { Schema, model } = require('mongoose'); 

const userSchema = new Schema(
    {
      username: {
          type: String,
          required: true,
          unique: true,
          trim: true,
      },

      email: {
          type: String,
          required: true,
          unique: true,
          validate: { 
          // validates that the email address is correctly formatted. REGEX
            validator: function(v) {
                return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(v);
            }
        }
      },

      friends:[
        {
          type: Schema.Types.ObjectId,
        //REFERENCES USER MODEL
          ref: 'User',
      }
    ],
      thoughts:[
        {
          type: Schema.Types.ObjectId,
        // references thought mode 
          ref: 'Thought',
      }
    ],

    },

    {
      toJSON: {
        virtuals: true,
      },
      id: false, 
  }
  );

// virtual property (not stored in the DB but dynamically computed) "friendCount" on "userSchema"
// get func computes the value of "friendCount" returning the length of the frieds array AKA the friend count of user
  userSchema.virtual('friendCount').get(function(){
      return this.friends.length;
  });

// mongoose model User based on userSchema
  const User = model('User',userSchema)

  module.exports = User