const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
// Define the User schema
const userSchema = new mongoose.Schema({

   name: {
      type: String,
      required: true,
      trim: true,
   },

   email: {
      type: String,
      required: true,
      unique: true,
   },

   password: {
      type: String,
      required: true,
      minlength: 6,
   },
   role: {
      type: String,
      required: true,
   },

   createdAt: {
      type: Date,
      default: Date.now,
   },

   updatedAt: {
      type: Date,
      default: Date.now,
   },

});

// Pre-save hook to hash the password before saving
userSchema.pre('save', async function (next) {
   if (this.isModified('password')) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
   }
   next();
});

const User = mongoose.model('users', userSchema);

module.exports = User;
