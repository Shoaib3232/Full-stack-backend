const mongoose = require("mongoose");
const Counter = require("./Counter");

console.log('Loading User model...');

const userSchema = new mongoose.Schema(
  {
    userId: { 
      type: Number, 
      unique: true,
      sparse: true // Allows multiple docs without userId field
    },
    name: { 
      type: String, 
      required: [true, 'Name is required'],
      trim: true 
    },
  },
  { 
    timestamps: true,
    // Add this to see what's happening
    statics: {
      async createWithAutoIncrement(name) {
        const user = new this({ name });
        return await user.save();
      }
    }
  }
);

// Define pre-save hook as a function declaration (not arrow function)
userSchema.pre('save', async function(next) {
  console.log('Pre-save hook triggered for user:', this.name);
  
  try {
    if (this.isNew) {
      console.log('New user detected, getting next userId...');
      
      const counter = await Counter.findOneAndUpdate(
        { name: 'userId' },
        { $inc: { seq: 1 } },
        { 
          upsert: true,
          returnDocument: 'after',
          // Add this for debugging
          setDefaultsOnInsert: true
        }
      );

      console.log('Counter value retrieved:', counter);
      
      if (!counter || !counter.seq) {
        throw new Error('Failed to get counter sequence');
      }

      this.userId = counter.seq;
      console.log(`Assigned userId ${this.userId} to user ${this.name}`);
    }
    next();
  } catch (error) {
    console.error('Error in pre-save hook:', error);
    next(error);
  }
});

// Add post-save hook for debugging
userSchema.post('save', function(doc) {
  console.log(`User saved successfully with userId: ${doc.userId}`);
});

// Check if model already exists to prevent overwrite
const User = mongoose.models.User || mongoose.model('User', userSchema);

console.log('User model loaded successfully');

module.exports = User;